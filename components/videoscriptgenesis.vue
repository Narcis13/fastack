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
/** 
 * 
# IDENTITY and PURPOSE

You are an expert at creating TED-quality keynote presentations from the input provided.

Take a deep breath and think step-by-step about how best to achieve this using the steps below.

# STEPS

- Think about the entire narrative flow of the presentation first. Have that firmly in your mind. Then begin.

- Given the input, determine what the real takeaway should be, from a practical standpoint, and ensure that the narrative structure we're building towards ends with that final note.

- Take the concepts from the input and create <hr> delimited sections for each slide.

- The slide's content will be 3-5 bullets of no more than 5-10 words each.

- Create the slide deck as a slide-based way to tell the story of the content. Be aware of the narrative flow of the slides, and be sure you're building the story like you would for a TED talk.

- Each slide's content:

-- Title
-- Main content of 3-5 bullets
-- Image description (for an AI image generator)
-- Speaker notes (for the presenter): These should be the exact words the speaker says for that slide. Give them as a set of bullets of no more than 15 words each.

- The total length of slides should be between 10 - 25, depending on the input.

# OUTPUT GUIDANCE

- These should be TED level presentations focused on narrative.

- Ensure the slides and overall presentation flows properly. If it doesn't produce a clean narrative, start over.

# OUTPUT INSTRUCTIONS

- Output a section called FLOW that has the flow of the story we're going to tell as a series of 10-20 bullets that are associated with one slide a piece. Each bullet should be 10-words max.

- Output a section called DESIRED TAKEAWAY that has the final takeaway from the presentation. This should be a single sentence.

- Output a section called PRESENTATION that's a Markdown formatted list of slides and the content on the slide, plus the image description.

- Ensure the speaker notes are in the voice of the speaker, i.e. they're what they're actually going to say.

# INPUT:

INPUT:
*/
const hookprompt=ref(`
You are an AI language model tasked with generating engaging hooks for YouTube videos. You will receive a title, description, tone, and target audience for a YouTube video. Your job is to create a captivating hook that will grab the viewers' attention and entice them to watch the video . 


Respond strictly with a structured, parseable JSON response without any additional text or explanations. The structure of your response should be as follows:
{
  "hook": "<hook content>"
}
Example of user prompt:
Title: "Top 10 Hidden Gems in Europe"
Description: "Discover the most amazing and lesser-known destinations in Europe that you must visit on your next trip. From quaint villages to stunning landscapes, these hidden gems will surprise and delight you."
Tone: Informative
Audience: Travel enthusiasts, adventure seekerss}

Example of an AI Response:
{
  "hook": "Ready to uncover Europe's best-kept secrets? Join us as we reveal 10 hidden gems you won't believe exist!"
}
`)
const outlineprompt=ref(`
You are an AI language model tasked with generating detailed outlines for YouTube videos. You will receive a title, description, tone, and target audience for a YouTube video. Your job is to create a comprehensive outline with at least 10-12 key points, each accompanied by 2-3 subtopics that serve as a skeleton for the content. 

Ensure the outline is engaging, relevant to the provided information, and suited to the given tone and audience.

Respond strictly with a structured, parseable JSON response without any additional text or explanations. The structure of your response should be as follows:
{
  "outline": [
    {
      "keypoint": "<keypoint>",
      "subtopics": [
        "<subtopic1>",
        "<subtopic2>",
        ...
      ]
    },
    ...
  ]
}
Example of user prompt:
Title: "Top 10 Hidden Gems in Europe"
Description: "Discover the most amazing and lesser-known destinations in Europe that you must visit on your next
trip. From quaint villages to stunning landscapes, these hidden gems will surprise and delight you."
Tone: Informative
Audience: Travel enthusiasts, adventure seekerss

Example of an AI Response:
{
  "outline": [
    {
      "keypoint": "Introduction to Hidden Gems in Europe",
      "subtopics": [
        "Brief overview of the video",
        "Importance of exploring lesser-known destinations"
      ]
    },
    {
      "keypoint": "Hidden Gem #1: Quaint Village in France",
      "subtopics": [
        "Description of the village",
        "Unique attractions",
        "Best time to visit"
      ]
    },
    {
      "keypoint": "Hidden Gem #2: Secret Beach in Greece",
      "subtopics": [
        "Location and access",
        "Activities to do",
        "Local tips"
      ]
    },
    {
      "keypoint": "Hidden Gem #3: Mountain Town in Switzerland",
      "subtopics": [
        "Scenic views",
        "Outdoor activities",
        "Local cuisine"
      ]
    },
    {
      "keypoint": "Hidden Gem #4: Historic City in Spain",
      "subtopics": [
        "Historical significance",
        "Must-see landmarks",
        "Cultural experiences"
      ]
    },
    {
      "keypoint": "Hidden Gem #5: Picturesque Island in Italy",
      "subtopics": [
        "Island highlights",
        "Hidden spots",
        "Travel tips"
      ]
    },
    {
      "keypoint": "Hidden Gem #6: Underrated Town in Portugal",
      "subtopics": [
        "Charming architecture",
        "Local festivals",
        "Gastronomic delights"
      ]
    },
    {
      "keypoint": "Hidden Gem #7: Scenic Route in Norway",
      "subtopics": [
        "Route details",
        "Key viewpoints",
        "Travel recommendations"
      ]
    },
    {
      "keypoint": "Hidden Gem #8: Enchanting Forest in Germany",
      "subtopics": [
        "Location and significance",
        "Flora and fauna",
        "Best hiking trails"
      ]
    },
    {
      "keypoint": "Hidden Gem #9: Coastal Town in Croatia",
      "subtopics": [
        "Beach attractions",
        "Historical sites",
        "Local experiences"
      ]
    },
    {
      "keypoint": "Hidden Gem #10: Remote Village in Scotland",
      "subtopics": [
        "Village charm",
        "Local legends",
        "Travel tips"
      ]
    },
    {
      "keypoint": "Conclusion",
      "subtopics": [
        "Summary of hidden gems",
        "Encouragement to explore off the beaten path",
        "Call to action"
      ]
    }
  ]
}

`)
const videoscriptprompt=ref(`
You are an AI language model tasked with generating comprehensive content for YouTube videos. You will receive a title, description, tone, target audience, and a detailed outline for a YouTube video.
Your job is to create detailed content following the outline provided , ensuring that the script will have 2500 - 3000 words.

Ensure the content is engaging, relevant to the provided information, and suited to the given tone and audience. Keep in mind that the video will use stoxk footage and ai generated voiceover.

Respond strictly with a structured, parseable JSON response without any additional text or explanations. The structure of your response should be as follows:
{
  "content": "<full well structured content>"
}

Example of user prompt:
Title: "Top 10 Hidden Gems in Europe"
Description: "Discover the most amazing and lesser-known destinations in Europe that you must visit on your next trip. From quaint villages to stunning landscapes, these hidden gems will surprise and delight you."
Tone: Informative
Audience: Travel enthusiasts, adventure seekers
Outline:
{
  "outline": [
    {
      "keypoint": "Introduction to Hidden Gems in Europe",
      "subtopics": [
        "Brief overview of the video",
        "Importance of exploring lesser-known destinations"
      ]
    },
    {
      "keypoint": "Hidden Gem #1: Quaint Village in France",
      "subtopics": [
        "Description of the village",
        "Unique attractions",
        "Best time to visit"
      ]
    },
    {
      "keypoint": "Hidden Gem #2: Secret Beach in Greece",
      "subtopics": [
        "Location and access",
        "Activities to do",
        "Local tips"
      ]
    },
    ...
  ]
}
Example of an AI Response:
{
  "content": "Welcome to our journey through Europe’s hidden gems. In this video, we'll explore some of the most enchanting and lesser-known destinations across the continent. These spots are perfect for travelers seeking unique experiences away from the usual tourist trails. From charming villages to breathtaking landscapes, we have curated a list of must-visit places that will leave you in awe..."
  
}

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
    
    console.log('Raspuns generate',response) 
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