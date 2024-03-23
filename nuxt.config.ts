// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@pinia/nuxt'],
  ssr: false,
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
  },
  // vite: {
  //   define: {
  //     'process.env.DEBUG': false,
  //   },
  // },
});
