// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    openai_key:process.env.openai_key,
    youtube_api_key:process.env.YouTubeAPIKey,
   
    public:{
      perplexity_api_key:process.env.perplexity_api_key
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