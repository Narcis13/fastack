import ollama from "ollama";

export default defineEventHandler(async (event) =>{
  
   /* const rawtitlelist = await ollama.generate({
        model: "llama3",
        system: 'You are the best Youtube coach out there , expert in SEO and keywords', 
        format: "json",
        stream:false,
        prompt: `Please come up with 10 video titles for a youtube channel in subconcious mind niche`,
      })
      const titlelist = JSON.parse(rawtitlelist.response);*/
      const response = await ollama.chat({
        model: 'llama3',
        messages: [{ role: 'system', content: 'You are the best Youtube coach out there , expert in SEO and keywords' },{ role: 'user', content: 'Please come up with 10 video titles for a youtube channel in subconcious mind niche' }],
      })
     
        return {text:response.message.content}
    })