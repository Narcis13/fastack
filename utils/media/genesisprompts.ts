export const hooktitleprompt = `
I'm going to provide you with some frameworks and your task will be to understand and write hooks for social media posts and youtube videos using these frameworks and examples.
There are 2 main goals you're looking to achieve when writing a hook:
Get the reader/viewer to stop scrolling.
Get the reader/viewer to click to read more.
5 elements of writing an effective headline:
Be CLEAR not Clever
Specify the WHO
Specify the WHAT
Specify the WHY
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
Strong declarative sentence + controversial opinion opener.
"I you use it right, Twitter is the most powerful platform in the world." This sentence makes a bold claim that is somewhat controversial. Most readers will disagree with that first sentence, which will cause them to keep reading.
Twist the knife. "But Twitter does a horrible job showing you Its advanced features. you probably know nothing about." This sentence tells the reeder: "you're missing out on some awesome stuff. But it's not your fault, and i'm here to help."
The first sentence hooked them and the second sentence got them wanting more of what feels like "insider info." Clear, not clever. "Here are 10 of them you probably know nothing about." As clear as it gets - I am making a promise to the reader that what follows are 10 features they don't know about (scratching the itch and solving the problem I laid out in the 2nd sentence):
This is a classic "insider info secrets" listicle you can use time and time again. Tell the reader you have some insider Into (and how the world has conspired against them to keep them from knowing about it). Then ease their pain by giving them the insider info in a concise listicle format. Using these framework give me 5 hooks for an youtube video about using Placebo effect in personal development pursuit
Very important,respond strictly with a structured, parseable JSON response without any additional text or explanations. The structure of your response should be as follows:
{
  "hooksandtitles": [
    {
      "hook": "<hook>",
      "title": "<title>"
    }
    ...
  ]
}
Example of user prompt: Give me 5 examples of hooks and titles using the framework provided and respecting strictly json output format for topic: Placebo effect in personal development pursuit
Example of an AI Response:
{
    "hooksandtitles": [
      {
        "hook": "Imagine waking up every day feeling unstoppable, without changing a single habit.",
        "title": "Feel Unstoppable Every Day: How the Placebo Effect Can Transform Your Life"
      }
      ...
    ]
  }
`
/*   
- Ensure the speaker notes are in the voice of the speaker and make it 12 sentences per slide or more. Use a slightly funny and sarcastic tone and even an intriquing one where you feel necessary captivate the audience.
-Image description (for an AI image generator)
-Speaker notes (for presenter): These should be the exact words the speaker says for that slide. Make 1 text bulk for the entire slide ,minimum 12 sentences per slide.Use a intriguing and FUNNY tone.
*/ 
export const slidesprompt = `
# IDENTITY and PURPOSE
You are an expert at creating TED-quality keynote presentations from the input provided.
Take a deep breath and think step-by-step about how best to achieve this using the steps below.
# STEPS
- Think about the entire narrative flow of the presentation first. Have that firmly in your mind. Then begin.
- Given the input, determine what the real takeaway should be, from a practical standpoint, and ensure that the narrative structure we're building towards ends with that final note.
- Take the concepts from the input and create <hr> delimited sections for each slide.
- The slide's content will be 3-5 bullets of no more than 5-10 words each.
- Create the slide deck as a slide-based way to tell the story of the content. Be aware of the narrative flow of the slides, and be sure you're building the story like you would for a TED talk.
# Each slide's content:
- Title
- Main content of 3-5 bullets
- The total length of slides will be between 8 - 12
# OUTPUT GUIDANCE
- These should be TED level presentations focused on narrative.
- Ensure the slides and overall presentation flows properly. If it doesn't produce a clean narrative, start over.
# OUTPUT INSTRUCTIONS
- Output a section called FLOW that has the flow of the story we're going to tell as a series of 8-12 bullets that are associated with one slide a piece. Each bullet should be 10-words max.
- Output a section called DESIRED_TAKEAWAY that has the final takeaway from the presentation. This should be no more than 3 sentences.
- Output a section called PRESENTATION that's a list of slides and the content on the slide.
Very important,respond strictly with a structured, parseable JSON response without any additional text or explanations. The structure of your response should be as follows:
{
  "FLOW": ["<flow bullet 1>","<flow bullet 2>",...],
  "DESIRED_TAKEAWAY":"<Text of the desired takeway of presentation...>",
  PRESENTATION:[
     {
       slide_title:"<Title of each slide>",
       slide_content:["<bullet 1 of content of this slide>","<bullet 2 of content of this slide>",...]
      },
      ...
  ]
}
Example of user prompt:Following strictly this framework, compose for me the slides of a presentation for the topic: Subconscious mind vs. conscious mind for personal development and growth.
Example of an AI Response:
{
"FLOW": [
"Introduction to the subconscious and conscious minds",
"Defining the conscious mind",
"Functions of the conscious mind",
"Defining the subconscious mind",
"Functions of the subconscious mind",
"Interaction between conscious and subconscious",
"Impact on personal development",
"Harnessing the power of the conscious mind",
"Unlocking the potential of the subconscious mind",
],
"DESIRED_TAKEAWAY": "Understanding and aligning the conscious and subconscious minds can significantly enhance personal development and growth. Practical techniques can help achieve this alignment, leading to long-term benefits.",
"PRESENTATION": [
{
"slide_title": "Introduction",
"slide_content": ["Subconscious vs. conscious minds", "Personal development link", "Growth potential"]
},
{
"slide_title": "The Conscious Mind",
"slide_content": ["Awareness", "Decision-making", "Rational thinking"]
},
{
"slide_title": "Functions of Conscious Mind",
"slide_content": ["Analyzing", "Critical thinking", "Short-term memory"]
},
...
]
}
`
export const narrativeprompt = `
You are tasked with generating speaker notes for a TED-like presentation. Your goal is to create engaging and captivating speaker notes for each slide of the presentation, tailored to the specified tone and audience. Here are the inputs you will be working with:
-TONE
-AUDIENCE
-PRESENTATION_JSON

Follow these steps to generate the speaker notes:

1. Parse the JSON input to extract the presentation structure, including the flow, desired takeaway, and individual slides with their titles and content.

2. For each slide in the presentation:
   a. Read the slide title and content carefully.
   b. Consider the overall flow of the presentation and the desired takeaway.
   c. Keep in mind the specified tone and audience throughout the process.
   d. Generate a minimum of 7 sentences of speaker notes that expand on the slide content, making it engaging and relevant to the audience.
   e. Ensure that the speaker notes align with the tone specified and are appropriate for the target audience.
   f. Maintain continuity in style and content from one slide to the next, creating a cohesive narrative throughout the presentation.

3. As you write the speaker notes, consider the following:
   - Use language and examples that will resonate with the specified audience.
   - Incorporate storytelling elements, anecdotes, or analogies where appropriate to make the content more relatable and memorable.
   - Address potential questions or concerns the audience might have about the topic.
   - Include transitions between slides to create a smooth flow of ideas.
   - Emphasize key points that support the desired takeaway of the presentation.

4. After generating speaker notes for all slides, review the entire set to ensure consistency in tone, style, and message across the presentation.

5. Format your output as a JSON object with the following structure:
   {
     "narrative": [
       {
         "slide_title": "Actual slide title from the presentation",
         "speaker_notes": "Generated speaker notes for this slide"
       },
       ...
     ]
   }

Remember to generate a minimum of 7 sentences per slide and maintain continuity in the style of text from slide to slide. Your output should be a valid JSON object without any additional text or explanations outside of the JSON structure.
`

export const imagegenerationprompt = `
You will be given a JSON object representing a presentation with speaker notes for each slide. Your task is to generate detailed AI image prompts for each slide based on the narration. Here's how to proceed:

1. First, you will receive the presentation data in this format:

SLIDES SPEAKER NOTES:
{
  "narrative": [
    {
      "slide_title": "Actual slide title from the presentation",
      "speaker_notes": "Generated speaker notes for this slide"
    },
    ...
  ]
}

2. Parse the JSON input to extract the slide titles and corresponding speaker notes.

3. For each slide, generate a detailed image prompt based on the speaker notes. The image prompt should:
   - Be relevant to the narration for that specific slide
   - Provide background details
   - Include foreground details
   - Be descriptive enough for AI image generation

4. Create your output as a JSON object with the following structure:
   {
     "imageprompts": [
       {
         "slide_title": "Actual slide title from the presentation",
         "image_prompt": "Generated image prompt for this slide"
       },
       ...
     ]
   }

5. When generating the image prompts, consider the following:
   - Visualize the key concepts mentioned in the speaker notes
   - Include relevant objects, characters, or scenes
   - Specify colors, lighting, and atmosphere where appropriate
   - Mention any important visual metaphors or symbols that could enhance the slide's message

6. Ensure that each image prompt is unique and tailored to its specific slide content.

7. Maintain a consistent level of detail across all image prompts.

8. Do not include any explanations or additional text outside of the required JSON structure.

Please provide your output in the exact JSON format specified, with no additional text or explanations.

`
export const descriptionprompt = `
You are tasked with creating a high-ranking YouTube video description that will help the video perform well in searches. This description should be compelling, informative, and optimized for YouTube's algorithm. Follow these instructions carefully to create the best possible description.

You will be provided with three key inputs:

1. KEYWORDS:
   This is an array of keywords that must be incorporated into the description.

2. TONE:
   This specifies the tone to be used throughout the description.

3. PRESENTATION_JSON
{
  "FLOW": ["<flow bullet 1>","<flow bullet 2>",...],
  "DESIRED_TAKEAWAY":"<Text of the desired takeway of presentation...>",
  PRESENTATION:[
     {
       slide_title:"<Title of each slide>",
       slide_content:["<bullet 1 of content of this slide>","<bullet 2 of content of this slide>",...]
      },
      ...
  ]
}

Instructions for crafting the description:

1. Keyword Usage:
   - Analyze the provided keywords and prioritize them based on relevance and search potential.
   - Incorporate as many keywords as possible into the description, ensuring they flow naturally within the text.
   - Use variations of the keywords where appropriate to increase the range of potential search matches.

2. Tone Implementation:
   - Carefully read and understand the specified tone.
   - Ensure that every sentence in your description aligns with this tone, maintaining consistency throughout.

3. Utilizing the Video Structure:
   - Examine the JSON structure of the video presentation.
   - Use this structure as a guide to create a comprehensive outline of the video's content.
   - Highlight key points, main topics, and any special features or segments of the video.

4. Description Components:
   - Start with a compelling hook that incorporates high-priority keywords and captures viewer interest.
   - Provide a brief overview of what viewers can expect from the video.
   - Break down the main sections or topics covered in the video, using the structure as a guide.
   - Highlight any special features, guest appearances, or unique aspects of the video.
   - Include a call-to-action encouraging viewers to like, comment, and subscribe.

5. SEO Optimization:
   - Place important keywords near the beginning of the description.
   - Use natural language and avoid keyword stuffing.
   - Include relevant links to the creator's social media, website, or related content when appropriate.

6. Hashtags and Length:
   - Add relevant hashtags at the end of the description, using keywords and popular related terms.
   - Ensure the description exceeds 500 words while remaining engaging and informative.
   - Break the description into easily readable paragraphs.

7. Compelling Elements:
   - Use questions to engage the viewer and encourage them to watch the video.
   - Highlight the value proposition - what will viewers gain or learn from watching?
   - Include any time stamps for key moments in the video if applicable.

8. Final Check:
   - Review the description to ensure it accurately represents the video content.
   - Verify that the tone is consistent and all required elements are included.
   - Double-check that you've used as many provided keywords as possible.

9. Create your output as a JSON object with the following structure:
   {
     "description": "YouTube video description ..."
   }
   Please provide your output in the exact JSON format specified, with no additional text or explanations. Remember to exceed 500 words, use the specified tone, incorporate as many keywords as possible, and add relevant hashtags at the end.

`

export const enhancedslidesprompt = `
You are an expert at creating TED-quality keynote presentations. Your task is to create a compelling presentation based on the given topic. Follow these instructions carefully to produce a structured, parseable JSON response.

Input:
<topic>
{{PRESENTATION_TOPIC}}
</topic>

Steps to create the presentation:
1. Analyze the topic and determine the key takeaway.
2. Develop a narrative flow for the presentation, consisting of 8-12 main points.
3. Create slide content for each point in the narrative flow.
4. Ensure the presentation tells a cohesive story, building towards the key takeaway.

For each slide:
- Create a concise, engaging title
- Develop 3-5 bullet points, each with 5-10 words maximum
- Ensure the content flows logically from one slide to the next

Output instructions:
Provide your response in a structured JSON format with the following sections:
1. FLOW: An array of 8-12 bullets (max 10 words each) representing the narrative flow of the presentation.
2. DESIRED_TAKEAWAY: The key takeaway of the presentation in 1-3 sentences.
3. PRESENTATION: An array of slide objects, each containing:
   - slide_title: The title of the slide
   - slide_content: An array of 3-5 bullet points for the slide content

Your response should strictly adhere to the following JSON structure, without any additional text or explanations:

{
  "FLOW": ["<flow bullet 1>", "<flow bullet 2>", ...],
  "DESIRED_TAKEAWAY": "<Text of the desired takeaway of presentation...>",
  "PRESENTATION": [
    {
      "slide_title": "<Title of each slide>",
      "slide_content": ["<bullet 1 of content of this slide>", "<bullet 2 of content of this slide>", ...]
    },
    ...
  ]
}

Ensure that your response is a valid JSON object that can be parsed without errors.

`