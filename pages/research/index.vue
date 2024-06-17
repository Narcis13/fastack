<script setup>
import { useQuasar } from 'quasar'
const $q = useQuasar()

let  researchdata =reactive({
    data:null
})
const model=ref("llama3")
const description=ref("You are going to create extremely good and captivating videos about ")
const topic = ref()

async function research(){
    console.log('reseraching....')
    $q.loading.show({
        delay: 400 // ms
        })

    researchdata.data=null;
    let response=  await $fetch("/api/ai/videosearch", {
        method: "POST",
        headers: {
         
        },
        body: {
          model:model.value,
          topic:topic.value,  
          description:description.value       },
      });
      $q.loading.hide()
      researchdata.data=response.data
     console.log(response) 
}
</script>


<template>
    <q-page padding class="flex justify-center">
        <div class="column q-pa-md" style="min-width: 600px;">

            <div class="text-h4 text-indigo">
                Video search
            </div>
            <q-input class="q-mt-sm" outlined v-model="topic" label="Topic" />
            <q-input class="q-mt-sm" outlined v-model="description" type="textarea" label="Description" />
            <q-input class="q-mt-sm q-mb-md" outlined v-model="model" label="AI Model" />
            <div class="flex flex-center">
                <q-btn class="q-mb-md" color="grey-4" text-color="purple" glossy unelevated icon="camera_enhance" @click="research" label="Research" style="max-width: 200px;"/>
            </div>
           
            <videosearchresults v-if="researchdata.data" :researchdata="researchdata"/>
            <videoscriptgenesis v-if="researchdata.data" :researchdata="researchdata"/>

        </div>

    </q-page>
</template>