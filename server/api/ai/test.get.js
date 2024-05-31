import OpenAI from "openai"


//env("openai_key")
const config = useRuntimeConfig();
const openai = new OpenAI({
  apiKey: config.openai_key,
})

export default defineEventHandler(async (event) =>{
  
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a very talented marketer. Come up please with 10 ideas for content about a new AI app for accountants!" }],
    model: "gpt-4o",
  });

    return {text:completion.choices[0].message.content}
  })