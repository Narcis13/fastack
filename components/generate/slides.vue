<script setup>
import { useQuasar } from 'quasar'
import {enhancedslidesprompt} from "~~/utils/media/genesisprompts"
import {useGeneratedVideoStore} from '~/stores/generatedVideoStore'

const props = defineProps({
    topic:String
})


const $q = useQuasar()
const model=ref("llama3")
const generatedVideoStore = useGeneratedVideoStore()
const userprompt=ref("Following strictly this framework, compose for me the slides of a presentation for the topic:"+generatedVideoStore.description)
const output=ref({})
async function generate(){
    console.log(userprompt.value)
    $q.loading.show({
      delay: 400 // ms
       })
    const response = await generatedVideoStore.runAgent('slides',model.value,enhancedslidesprompt,userprompt.value)
 
       $q.loading.hide()

       console.log('Raspuns',response)
       generatedVideoStore.elements['slides']=response.data.generated
       output.value=response.data.generated
}

</script>

<template>
    <div class="column">
        <div class="text-h6">Slides</div>
        
        <div class="flex flex-center q-gutter-x-md  " >
            <q-select :options="generatedVideoStore.models" class="q-mt-sm q-mb-md q-ml-xl" outlined v-model="model" label="AI Model" style="min-width: 300px;"/>
            <q-btn class="q-mb-md" color="grey-4" text-color="purple" glossy unelevated icon="camera_enhance" @click="generate" label="Generate" style="max-width: 200px;"/>
        </div>

        <div class="q-pa-md" >
                <q-list padding bordered class="rounded-borders">
                <q-expansion-item
                    dense
                    dense-toggle
                    group="somegroup"
                    expand-separator
                    icon="perm_identity"
                    label="System prompt"
                >
                    <q-card>
                    <q-card-section>
                        {{ enhancedslidesprompt }}
                    </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-expansion-item
                    dense
                    dense-toggle
                    group="somegroup"
                    expand-separator
                    icon="signal_wifi_off"
                    label="User prompt"
                >
                    <q-card>
                    <q-card-section>
                      {{ userprompt }}
                    </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-expansion-item
                    dense
                    dense-toggle
                    expand-separator
                    group="somegroup"
                    icon="drafts"
                    label="Generated result"
                    header-class="text-purple"
                >
                    <q-card>
                    <q-card-section>
                     {{  JSON.stringify(output,null,2)}}
                    </q-card-section>
                    </q-card>
                </q-expansion-item>
                </q-list>
  </div>
    </div>
   
</template>