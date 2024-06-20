<script setup>
import { useQuasar } from 'quasar'
import {hooktitleprompt} from "~~/utils/media/genesisprompts"
import {useGeneratedVideoStore} from '~/stores/generatedVideoStore'
const $q = useQuasar()
const model=ref("llama3")
const generatedVideoStore = useGeneratedVideoStore()

async function generate(){
    $q.loading.show({
      delay: 400 // ms
       })
    const response = await generatedVideoStore.runAgent('hooksandtitles')
 
       $q.loading.hide()

       console.log('Raspuns',response)
}

</script>

<template>
    <div class="column">
        <div class="text-h6">Title & Hook</div>
        <q-select :options="generatedVideoStore.models" class="q-mt-sm q-mb-md" outlined v-model="model" label="AI Model" />
        <div class="flex flex-center">
                <q-btn class="q-mb-md" color="grey-4" text-color="purple" glossy unelevated icon="camera_enhance" @click="generate" label="Generate" style="max-width: 200px;"/>
            </div>
    </div>
   
</template>