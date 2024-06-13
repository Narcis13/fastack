import ollama from "ollama";
import OpenAI from "openai";


const config = useRuntimeConfig();
const openai = new OpenAI({
  apiKey: config.openai_key,
})


export default async function airunner(model:string,systemprompt:string,userprompt:string){
    let response: {
        response: {} | string | null;
    } = {
        response: null // or provide an appropriate initial value
    };

 if(model=='llama-3-sonar-large-32k-online'||model=='llama-3-sonar-small-32k-online'){

    let p :any =  await $fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${config.public.perplexity_api_key}`
        },
        body: 
            {
                model: model,
                messages: [
                {role: 'system', content: systemprompt},
                {role: 'user', content: userprompt}
                ],
                max_tokens: 8000,
                temperature: 0.3,
                top_p: 0.9,
                return_citations: false,
                return_images: false,
                top_k: 0,
                stream: false,
                presence_penalty: 0,
                frequency_penalty: 1
            },
         
      });
      response.response=p.choices[0].message.content;
 }


if(model==='gpt-4o'||model==='gpt-3.5-turbo'){
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: systemprompt },{role:"user", content:userprompt}],
        model: model,
      });

      response.response=completion.choices[0].message.content;
}

if(model==='llama3'||model==='zephyr'){
    response=await ollama.generate({
        model: model,
        system: systemprompt, 
        format: "json",
        prompt: userprompt
      })
}
return response;

}