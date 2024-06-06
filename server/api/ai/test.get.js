import OpenAI from "openai"


//env("openai_key")
const config = useRuntimeConfig();
const openai = new OpenAI({
  apiKey: config.openai_key,
})

export default defineEventHandler(async (event) =>{
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a very talented marketer. Come up please with 10 popular long tail kewords for the topic specified by user" },{role:"user", content:"Topic:subconscious mind. I expect output in JSON format with template {keywords:[keyword1,keyword2,...]}"}],
    model: "gpt-4o",
  });

    return {response:completion.choices[0].message.content}

  })