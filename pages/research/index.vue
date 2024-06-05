<script setup>

const model=ref("llama3")
const description=ref("")
const topic = ref()

function research(){
    console.log('reseraching....')
}
</script>


<template>
    <q-page padding class="flex justify-center">
        <div class="column q-pa-md">

            <div class="text-h4 text-indigo">
                Video search
            </div>
            <q-input class="q-mt-sm" outlined v-model="topic" label="Topic" />
            <q-input class="q-mt-sm" outlined v-model="description" type="textarea" label="Description" />
            <q-input class="q-mt-sm q-mb-md" outlined v-model="model" label="AI Model" />
            <q-btn color="grey-4" text-color="purple" glossy unelevated icon="camera_enhance" @click="research" label="Research" />
        </div>

    </q-page>
</template>