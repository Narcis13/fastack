// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    openai_key:process.env.openai_key,
    youtube_api_key:process.env.YouTubeAPIKey,
    public:{
     // placeHost:process.env.NUXT_PLACE_HOST,
    }
    
  },
  modules: ['@pinia/nuxt', "nuxt-quasar-ui"],
  
  quasar:{
    plugins: [
      'Notify',
      'Dialog',
      'Loading'
    ]
  }
})