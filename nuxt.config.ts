import { defineNuxtConfig } from 'nuxt'
const lifecycle = process.env.npm_lifecycle_event

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  meta: {
    title: 'ColorX - 中国传统色彩',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: 'ColorX - 中国传统色彩',
      },
      {
        name: 'keywords',
        content: 'ColorX,色彩,中国传统色彩',
      },
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: 'ColorX - 中国传统色彩' },
      { name: 'og:url', content: 'https://color.tomsawyer2.xyz/' },
      { name: 'og:width', content: '846' },
      { name: 'og:height', content: '566' },
      { name: 'og:image', content: 'https://blog.tomsawyer2.xyz/pics/og-image.png' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://blog.tomsawyer2.xyz/pics/favicon.ico' }],
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    transpile:
      lifecycle === 'build' || lifecycle === 'generate' ? ['element-plus'] : [],
  },
  components: true,
  // vueuse
  vueuse: {
    ssrHandlers: true,
  },
})
