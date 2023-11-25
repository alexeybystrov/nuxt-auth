// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module'],
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
  },
  // vite: {
  //   define: {
  //     'process.env.DEBUG': false,
  //   },
  // },
});
