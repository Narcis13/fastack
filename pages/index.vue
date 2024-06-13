<script setup>
const config = useRuntimeConfig();

async function perplex(){


    let response=  await $fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${config.public.perplexity_api_key}`
        },
        body: 
            {
                model: 'llama-3-sonar-large-32k-online',
                messages: [
                {role: 'system', content: 'You must summarize as outline with keypoints and subkeypoints and describe the tone of an youtube video provided by the user.Make it at least 1000 words and the response will be in strict json format without anything else using as template {title:"youtube title goes here",summary:"youtube video summary goes here",tone:"youtube video tone goes here"}'},
                {role: 'user', content: 'Youtube video: https://www.youtube.com/watch?v=l1TCWLzx6Fc'}
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

      console.log(response.choices[0].message.content)
}

</script>


<template>
    <div class="flex flex-center">
        <div class="column">
            <q-btn @click="perplex">
                Perplex
            </q-btn>
        </div>
    </div>
</template>