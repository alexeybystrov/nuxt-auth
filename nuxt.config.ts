// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      script: [{ src: 'https://accounts.google.com/gsi/client' }],
    },
  },
  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt'],
  // ssr: false,
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  nitro: {
    plugins: ['~/server/index.ts'],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    secret: process.env.SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
    },
  },
  // vite: {
  //   define: {
  //     'process.env.DEBUG': false,
  //   },
  // },
});
