<script setup>
import { useQuasar } from 'quasar'
import {useGeneratedVideoStore} from '~/stores/generatedVideoStore'
const $q = useQuasar()
const generatedVideoStore = useGeneratedVideoStore()
let  researchdata =reactive({
    data:null
})
const tab=ref('titles')
const model=ref("llama3")
//const models=["llama3","zephyr","gpt-4o",'llama-3-sonar-large-32k-online']
//const description=ref("You are going to create extremely good and captivating video about ")
const topic = ref()
async function save(){


    await $fetch("/api/ai/videogenerate", {
         method: "POST",
        headers: {
         
        },
         body: {
            topic:generatedVideoStore.description,
            hooksandtitles:generatedVideoStore.elements.hooksandtitles,
            keywords:generatedVideoStore.elements.keywords,
            slides:generatedVideoStore.elements.slides,
            narrative:generatedVideoStore.elements.narrative,
            imageprompts:generatedVideoStore.elements.imageprompts,
            description:generatedVideoStore.elements.description
    //       model:model.value,
    //       topic:topic.value,  
    //       description:description.value  
     },
      });

}
async function start(){
     console.log('starting....')
     $q.loading.show({
       delay: 400 // ms
        })

    // researchdata.data=null;
     let response=  await $fetch("/api/ai/videogenerate/hooksandtitles", {
         method: "POST",
        headers: {
         
        },
         body: {
    //       model:model.value,
    //       topic:topic.value,  
    //       description:description.value  
     },
      });
      $q.loading.hide()
  //   researchdata.data=response.data
    console.log(response) 
}
</script>


<template>
    <q-page padding class="flex justify-center">
        <div class="column q-pa-md" style="min-width: 600px;">

            <div class="text-h4 text-indigo">
                Video genesis
            </div>
            <!-- <q-input class="q-mt-sm" outlined v-model="topic" label="Topic" /> -->
            <q-input class="q-mt-sm" outlined v-model="generatedVideoStore.description" type="textarea" label="Description" />
            <q-input class="q-mt-sm" outlined v-model="generatedVideoStore.audience"  label="Audience" />
            <q-input class="q-mt-sm q-mb-md" outlined v-model="generatedVideoStore.tone"  label="Tone" />
            <!-- <q-select :options="generatedVideoStore.models" class="q-mt-sm q-mb-md" outlined v-model="model" label="AI Model" />-->
            <div class="flex flex-center">
                <q-btn class="q-mb-xl" color="grey-4" text-color="purple" glossy unelevated icon="camera_enhance" @click="save" label="Save iteration" style="max-width: 200px;"/>
            </div> 
           
            <div >
                <div class="q-gutter-y-md" style="max-width: 980px">
                    <q-card>
                        <q-tabs
                            v-model="tab"
                            dense
                            class="text-grey"
                            active-color="primary"
                            indicator-color="primary"
                            align="justify"
                            narrow-indicator
                            >
                        <q-tab name="titles" label="Title&Hook" />
                        <q-tab name="keywords" label="Keywords" />
                        <q-tab name="slides" label="Slides" />
                        <q-tab name="narrative" label="Narrative" />
                        <q-tab name="imageprompts" label="Image Prompts" />
                        <q-tab name="description" label="Video description" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="titles">
                            
                          <generate-titles />

                        </q-tab-panel>

                        <q-tab-panel name="keywords">
                            <generate-keywords />
                        </q-tab-panel>

                        <q-tab-panel name="slides">
                          <generate-slides />
                        </q-tab-panel>

                        <q-tab-panel name="narrative">
                          <generate_narrative />
                        </q-tab-panel>

                        <q-tab-panel name="imageprompts">
                          <generate-imageprompts />
                        </q-tab-panel>
                        <q-tab-panel name="description">
                          <div>
                              <generate-description />
                          </div>
                        </q-tab-panel>
                        </q-tab-panels>
                    </q-card>

                   
                    </div>
                </div>
            <!-- <videosearchresults v-if="researchdata.data" :researchdata="researchdata"/>
            <videoscriptgenesis v-if="researchdata.data" :researchdata="researchdata"/> -->

        </div>

    </q-page>
</template>