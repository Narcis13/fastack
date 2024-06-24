import Anthropic from '@anthropic-ai/sdk';


//env("openai_key")
const config = useRuntimeConfig();


const anthropic = new Anthropic({
  apiKey: config.anthropic_key // defaults to process.env["ANTHROPIC_API_KEY"]
});

//.response.content[0].text


export default defineEventHandler(async (event) =>{
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    temperature: 0,
    system: "You are an AI model , best in class for generating youtube video script for a topic. You are slightly sarcastic, funny , direct and produce content that is intriguing, making viewers addicted to your content ",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Topic: 5 little known facts about subconscious mind" }],
  });

    return {response:msg.content[0].text}

  })