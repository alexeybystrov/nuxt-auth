# Stage 1: Build stage
FROM node:20-alpine AS builder

# Update Alpine packages to patch vulnerabilities
RUN apk update && apk upgrade --no-cache && apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine AS production

# Update Alpine packages to patch vulnerabilities
RUN apk update && apk upgrade --no-cache && apk add --no-cache libc6-compat

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxt -u 1001 -G nodejs

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy production node_modules from builder (includes nuxt for postinstall)
COPY --from=builder /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/public ./public

# Change ownership to non-root user
RUN chown -R nuxt:nodejs /app

# Switch to non-root user
USER nuxt

# Expose port 3000
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", ".output/server/index.mjs"]

