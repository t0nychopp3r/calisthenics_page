// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path';
export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  
  alias: {
    '@': resolve(__dirname, '/'),
  },

  css: [
    '~/assets/main.css',
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  supabase:{
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/workout_logger'], // Define routes to include, if any
      exclude: [], // Define routes to exclude, if any
      cookieRedirect: false,
    }
  }
});