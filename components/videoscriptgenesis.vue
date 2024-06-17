<script setup>
import { useQuasar } from 'quasar'
const $q = useQuasar()

const props = defineProps({
    researchdata:Object
})
//console.log('genesis',props.researchdata.data.titlelist.titles)
const promptpanel = ref('hook')
const title=ref(props.researchdata.data.titlelist.titles[0])
const description=ref(props.researchdata.data.newdescription)
const tone=ref(props.researchdata.data.summary.tone)
const audience = ref('young and mid-age, smart and curious eager to grow as a person, slightly more women than men')
const model=ref('llama-3-sonar-large-32k-online')
const hookprompt=ref(`
Hook prompt
`)
const outlineprompt=ref(`
Outline prompt
`)
const videoscriptprompt=ref(`
Script prompt
`)

async function generate(){
    $q.loading.show({
        delay: 400 // ms
        })

   
    let response=  await $fetch("/api/ai/videosearch/generate", {
        method: "POST",
        headers: {
         
        },
        body: {
          title:title.value,
          description:description.value,  
          tone:tone.value     ,
          audience:audience.value,
          model:model.value,
          hookprompt:hookprompt.value,
          outlineprompt:outlineprompt.value,
          videoscriptprompt:videoscriptprompt.value
          },
      });
      $q.loading.hide()
    
   //  console.log('Raspuns generate',response) 
}
</script>


<template>
    <div class="flex flex-center q-mt-md">
        <div class="column" style="min-width: 650px">
            <div class="text-h5">
                Genesis
            </div>  
            
            <q-select class="q-mt-sm" outlined :options="props.researchdata.data.titlelist.titles" v-model="title" label="Title" />
            <q-input class="q-mt-sm" outlined v-model="description" type="textarea" label="Description" />
            <q-input class="q-mt-sm" outlined v-model="tone" type="textarea" label="Tone" />
            <q-input class="q-mt-sm" outlined v-model="audience" type="textarea" label="Audience" />
            <q-input class="q-mt-sm q-mb-md" outlined v-model="model" label="AI Model" />

            <div class="q-pa-md">
            <div class="q-gutter-y-md" >
            <q-option-group
                v-model="promptpanel"
                inline
                :options="[
                { label: 'Hook Prompt', value: 'hook' },
                { label: 'Outline Prompt', value: 'outline' },
                { label: 'Script Prompt', value: 'script' }
                ]"
            />

            <q-tab-panels v-model="promptpanel" animated class="shadow-2 rounded-borders">
                <q-tab-panel name="hook">
                    <q-input class="q-mt-sm" outlined v-model="hookprompt" type="textarea" label="Hook prompt" />
                </q-tab-panel>

                <q-tab-panel name="outline">
                    <q-input class="q-mt-sm" outlined v-model="outlineprompt" type="textarea" label="Outline prompt" />
                </q-tab-panel>

                <q-tab-panel name="script">
                    <q-input class="q-mt-sm" outlined v-model="videoscriptprompt" type="textarea" label="Script prompt" />
                </q-tab-panel>
            </q-tab-panels>
            </div>

            <div class="flex flex-center q-mt-md">
                <q-btn class="q-mb-md" color="grey-4" text-color="purple" glossy unelevated icon="camera_enhance" @click="generate" label="Generate" style="max-width: 200px;"/>
            </div>
        </div>
        </div>
    </div>
</template>