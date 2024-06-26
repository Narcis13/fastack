import {defineStore} from 'pinia'


export const useGeneratedVideoStore = defineStore('generatedStore',()=>{

  const models=["llama3","zephyr","gpt-4o",'claude-3-5-sonnet-20240620','gpt-3.5-turbo','llama-3-sonar-large-32k-online']
  const description = ref("")
  const audience = ref("Average normal people, mostly women, non academic")
  const tone = ref("Intriguing, slightly sarcastic, slightly humorous, direct and captivating")

  const elements = reactive({
    hooksandtitles:{},
    keywords:{},
    slides:{},
    narrative:{},
    imageprompts:{}
  })
  async function runAgent(agent, model,systemprompt, userprompt){
    console.log('starting:',agent)


   // researchdata.data=null;
    let response=  await $fetch("/api/ai/videogenerate/"+agent, {
        method: "POST",
       headers: {
        
       },
        body: {
         model,
         systemprompt,
         userprompt

    },
     });
   
   return response;
}

  return {
    models,
    runAgent,
    elements,
    description,
    tone,
    audience
  }

})