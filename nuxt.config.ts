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
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined, // Define routes to include, if any
      exclude: [], // Define routes to exclude, if any
      cookieRedirect: false,
    }
  }
});