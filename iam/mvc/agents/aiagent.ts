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