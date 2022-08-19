import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  plugins: [
    '~/plugins/element-plus.ts',
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
})
