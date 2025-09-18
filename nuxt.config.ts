// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: true
  },
  devtools: { 
    enabled: process.env.NODE_ENV === 'development' ? true : false
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
      apiURL: process.env.API_URL || 'http://localhost:3000/api'
    }
  },
  nitro: {
    preset: process.env.NODE_ENV === 'production' ? 'vercel' : 'node-server',
    compressPublicAssets: process.env.NODE_ENV === 'production',
    minify: process.env.NODE_ENV === 'production'
  },
  vite: {
    build: {
      minify: process.env.NODE_ENV === 'production' ? 'esbuild' : false,
      cssMinify: process.env.NODE_ENV === 'production'
    }
  },
  devServer: {
    port: 3000,
    host: 'localhost'
  },
  compatibilityDate: '2025-07-15'
})
