<script setup>
const   tab= ref('keywords')
const  splitterModel= ref(20)
const props = defineProps({
    researchdata:Object
})


console.log('videoresearch',props.researchdata)
</script>





<template>
    <div>
      <q-splitter
        v-model="splitterModel"
        style="height: 450px"
      >
  
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-teal"
          >
            <q-tab name="keywords" icon="mail" label="Keywords" />
            <q-tab name="titles" icon="alarm" label="Titles" />
            <q-tab name="description" icon="movie" label="Description" />
            <q-tab name="transcriptions" icon="movie" label="Transcriptions" />
            <q-tab name="summary" icon="movie" label="Summary" />
          </q-tabs>
        </template>
  
        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="keywords">
              <div class="text-h4 q-mb-md">Keywords</div>
             <div class="text-body2">
               {{ props.researchdata.data.keywordslist }}
             </div>
            </q-tab-panel>
  
            <q-tab-panel name="titles">
              <div class="text-h4 q-mb-md">Titles</div>
              <div class="text-body2">
               {{ props.researchdata.data.titlelist }}
             </div>
            </q-tab-panel>
  
            <q-tab-panel name="description">
              <div class="text-h4 q-mb-md">Description</div>
              <div class="text-body2">
               {{ props.researchdata.data.newdescription }}
             </div>
            </q-tab-panel>

            <q-tab-panel name="transcriptions">
              <div class="text-h4 q-mb-md">Transcriptions</div>
              <div class="text-body2">
               {{ props.researchdata.data.transcriptions }}
             </div>
            </q-tab-panel>

            <q-tab-panel name="summary">
              <div class="text-h4 q-mb-md">Summary</div>
              <div class="text-body2">
               {{ props.researchdata.data.summary }}
             </div>
            </q-tab-panel>

          </q-tab-panels>
        </template>
  
      </q-splitter>
    </div>
  </template>