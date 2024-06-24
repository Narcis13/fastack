export const titleprompt = `You will be given a topic, a description, and a list of high performing titles for a similar topic. 
Create 10 potential titles for this video topic and description. 
It is very important to use the list of videos to help you generate the titles. 
The titles should be less than 70 characters and should have a high click-through-rate.`

export const descriptionprompt = `Create a great description for a video based on the information provided by the user.
 This description will be added to the video on YouTube when it is submitted. 
 The description should be 200 to 500 words and is mandatory to include long tail keywords provided by the user. 
 At the end, include something convincing to encourage the user to subscribe to the newsletter .`

export const announcementprompt = `Every time I have a new video, I like to send out an email to my subscribers. 
Please create an email to send to that list based on the topic and description provided by the user.
 The email should be 300 to 600 words and include a place for the subscriber\'s name, what the viewer will learn from the video, and a link to the video that will render in an email.
  Also encourage the reader to sign up for my patreon if they want to support me further. 
  The email should be signed off from me, Narcissus.`

  export const keywordsprompt = `
  You are tasked with generating SEO-friendly keywords and long-tail keywords for a given topic. Your goal is to create a list of keywords that have high potential for ranking well in search engine results.
Guidelines for generating keywords:
- Focus on relevance to the topic
- Consider search volume and competition
- Include a mix of short-tail (1-2 words) and long-tail (3-5 words) keywords
- Use variations and synonyms of key terms
- Include question-based keywords where appropriate

Your output should be a JSON object containing an array of keywords. The format should be as follows:
{
  "keywords": ["keyword1", "keyword2", "long tail keyword1", ...]
}

The topic you will generate keywords for is:
<topic>
{{TOPIC}}
</topic>

Instructions:
1. Analyze the given topic and identify main concepts and related themes.
2. Generate a list of at least 4 short-tail keywords (1-2 words) related to the topic.
3. Create at least 4 long-tail keywords (3-5 words) that are more specific and targeted.
4. Ensure all keywords are SEO-friendly by considering search intent, relevance, and potential search volume.
5. Combine all keywords into a single array.
6. Format the array as a JSON object as shown in the example above.
7. Output only the JSON object, with no additional text or explanation.

Remember to focus on creating keywords that have a high potential for ranking well in search engine results. Your output should contain a total of at least 8 keywords (combining both short-tail and long-tail). 

  `

  export const contentprompt = `Create complete content  for a video based on the information provided by the user.
The content must be 4000 - 5000 words in length. You will be provided with a description to plan the content outline from and an excerpt of similar popular video transcript to borrow the tone and find some inspiration
 At the beginning provide a hook to retain the viewer attention and after this you will generate a slightly funny, direct, engaging text.
 At the end, include something convincing to encourage the viewer to subscribe to the channel .`

 export const summarypropmt = `You must summarize the video as outline with keypoints and subkeypoints and describe the tone of an youtube video provided by the user.
 Make it at least 1000 words and the response will be in strict json format without anything else, using as template {title:"youtube title goes here",summary:"youtube video summary goes here",tone:"youtube video tone goes here"} `