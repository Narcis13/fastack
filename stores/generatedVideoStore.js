import {defineStore} from 'pinia'

export const useGeneratedVideoStore = defineStore('generatedStore',()=>{

  const models=["llama3","zephyr","gpt-4o",'llama-3-sonar-large-32k-online']

  async function runAgent(agent, model,systemprompt, userprompt){
    console.log('starting:',agent)


   // researchdata.data=null;
    let response=  await $fetch("/api/ai/videogenerate/"+agent, {
        method: "POST",
       headers: {
        
       },
        body: {
   //       model:model.value,
   //       topic:topic.value,  
   //       description:description.value  
    },
     });
   return response;
}

  return {
    models,
    runAgent
  }

})