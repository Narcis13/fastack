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
You are an AI language model tasked with generating engaging hooks for YouTube videos. You will receive a title, description, tone, and target audience for a YouTube video. Your job is to create a captivating hook that will grab the viewers' attention and entice them to watch the video using these frameworks. 

There are 2 main goals you're looking to achieve when writing a hook:
Get the reader to stop scrolling
Get the reader to click to read more 5 elements of writing an effective headline:
Be CLEAR not Clever
Specify the WHO
Specify the WHAT
Specify the WHY
Twist The Knife

6 proven ways to write an engaging first sentence:
Open with 1 strong declarative sentence.
Open with a thought-provoking question.
Open with a controversial opinion.
Open with a moment in time.
Open with a vulnerable statement.
Open with a weird unique insight.

Viral Tweet Thread Example #1
Principles this thread uses & why they worked:
Strong deciarative sentence + controversial opinion opener.
"I you use it right, Twitter is the most powerful platform in the world." This sentence makes a bold claim that is somewhat controversial. Most readers will disagree with that first sentence, which will cause them to keep reading.
Twist the knife. "But Twitter does a horrible job showing you Its advanced features. you probably know nothing about." This sentence tells the reeder: "you're missing out on some awesome stuffi But it's not your fault, and i'm here to help."

The first sentence hooked them and the second sentence got them wanting more of what feels like "insider info." Clear, not clever. "Here are 10 of them you probably know nothing about." As clear as it gets - I am making a promise to the reader that what follows are 10 features they don't know about (scratching the itch and solving the problem I laid out in the 2nd sentence):
This is a classic "insider info secrets" listicle you can use time and time again. Tell the reader you have some insider Into (and how the world has conspired against them to keep them from knowing about it). Then ease their pain by giving them the insider info in a concise listicle format.


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
Your job is to create detailed content for each subtopic under each key point in the outline, ensuring that each subtopic content  has more than 200 words.

Ensure the content is engaging, relevant to the provided information, and suited to the given tone and audience.

Respond strictly with a structured, parseable JSON response without any additional text or explanations. The structure of your response should be as follows:
{
  "content": [
    {
      "keypoint": "<keypoint>",
      "subtopics": [
        {
          "subtopic": "<subtopic title>",
          "content": "<content related to the subtopic>"
        },
        ...
      ]
    },
    ...
  ]
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
  "content": [
    {
      "keypoint": "Introduction to Hidden Gems in Europe",
      "subtopics": [
        {
          "subtopic": "Brief overview of the video",
          "content": "Welcome to our journey through Europe’s hidden gems. In this video, we'll explore some of the most enchanting and lesser-known destinations across the continent. These spots are perfect for travelers seeking unique experiences away from the usual tourist trails. From charming villages to breathtaking landscapes, we have curated a list of must-visit places that will leave you in awe."
        },
        {
          "subtopic": "Importance of exploring lesser-known destinations",
          "content": "While popular tourist spots have their charm, exploring lesser-known destinations offers a unique and often more authentic experience. These hidden gems provide a sense of discovery and adventure, allowing travelers to connect with local cultures and traditions in a more intimate setting. Additionally, visiting these places can help support local communities and promote sustainable tourism."
        }
      ]
    },
    {
      "keypoint": "Hidden Gem #1: Quaint Village in France",
      "subtopics": [
        {
          "subtopic": "Description of the village",
          "content": "Our first hidden gem is a picturesque village nestled in the French countryside. With its cobblestone streets, historic architecture, and vibrant flower gardens, this village looks like it’s straight out of a fairy tale. The serene atmosphere and friendly locals make it a perfect getaway for those looking to escape the hustle and bustle of city life."
        },
        {
          "subtopic": "Unique attractions",
          "content": "The village is home to several unique attractions, including an ancient castle, a charming market square, and a beautiful church with stunning stained-glass windows. Visitors can also enjoy local craft shops and cozy cafes that offer delicious French pastries and coffee."
        },
        {
          "subtopic": "Best time to visit",
          "content": "The best time to visit this village is during the spring and summer months when the weather is pleasant and the gardens are in full bloom. However, autumn also offers a special charm with its colorful foliage, making it an ideal time for photography enthusiasts."
        }
      ]
    },
    {
      "keypoint": "Hidden Gem #2: Secret Beach in Greece",
      "subtopics": [
        {
          "subtopic": "Location and access",
          "content": "Our next hidden gem is a secluded beach located on one of Greece’s less-traveled islands. This pristine beach is surrounded by rugged cliffs and crystal-clear waters, providing a perfect escape for beach lovers. Accessing this beach requires a short hike through a scenic trail, but the effort is well worth it."
        },
        {
          "subtopic": "Activities to do",
          "content": "Visitors can enjoy a range of activities at this secret beach, including swimming, snorkeling, and sunbathing. The calm waters are ideal for snorkeling, allowing you to explore the vibrant marine life just beneath the surface. For those seeking relaxation, the beach offers plenty of spots to lay out a towel and soak up the sun."
        },
        {
          "subtopic": "Local tips",
          "content": "To make the most of your visit, consider packing a picnic with local Greek delicacies and enjoying a meal by the sea. Additionally, visiting early in the morning or late in the afternoon can help you avoid the few crowds that may know about this hidden gem. Don’t forget to bring plenty of water and sun protection, as there are limited facilities on-site."
        }
      ]
    },
    ...
  ]
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