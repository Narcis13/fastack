/* Example doodads model
 * Data manipulation of all doodad requests
 */

import { H3Event } from "h3";
//import ollama from "ollama";
import type { JSONResponse } from "~~/iam/misc/types";
import { titleprompt, descriptionprompt, announcementprompt , keywordsprompt, summarypropmt} from "~~/utils/media/prompts";
import * as djson from "dirty-json";
import {  videoSearchTool, videoDetailsTool } from "~~/utils/media/videoSearchTools";
import { YoutubeTranscript } from 'youtube-transcript';
import airunner from "../agents/aiagent";
/**
 * @desc Shows all doodads
 * @param event H3 Event passed from api
 * @returns {Promise<JSONResponse>} Returns doodads or error
 */
export async function index(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;  
  //console.log('index doodads',event)
  const info = "get all videos"  
  const videos = await videoSearchTool('subliminal messages', 50)
  let scoredVideos = []
  for (const video of videos) {
    const videodetails = await videoDetailsTool(video);
    scoredVideos.push(videodetails);
  }
  
  scoredVideos = scoredVideos.sort((a, b) => b.score - a.score).slice(0, 15);
  response.status = "success";
  response.data = {
    info,
    scoredVideos
  };

  return response;
}

/**
 * @desc Creates a new doodad in database
 * @param event H3 Event passed from api
 * @returns {Promise<JSONResponse>}
 */
export async function create(event: H3Event): Promise<JSONResponse> {
  const response = {} as JSONResponse;
  const body = await readBody(event);
  const model = body.model;
  console.log(body)
  const topic = body.topic
  const details = body.description;
  
  const videos = await videoSearchTool(topic, 50)
  let scoredVideos = []
  for (const video of videos) {
    const videodetails = await videoDetailsTool(video);
    scoredVideos.push(videodetails);
  }
  
  scoredVideos = scoredVideos.sort((a, b) => b.score - a.score).slice(0, 15);


/*    TRANSCRIPTIONS      */ 
  let transcript1=''

  let transcript2=''
  let transcript3=''
  try {
    const textjson1= await YoutubeTranscript.fetchTranscript(scoredVideos[0].id)
    textjson1.map(t=>{
      transcript1+=t.text+' '
    })

    const textjson2= await YoutubeTranscript.fetchTranscript(scoredVideos[1].id)
       textjson2.map(t=>{
         transcript2+=t.text+' '
       })

 
       const textjson3= await YoutubeTranscript.fetchTranscript(scoredVideos[2].id)
          textjson3.map(t=>{
            transcript3+=t.text+' '
          })
  } catch(e){
      console.log(e)
  }        

 let summary=null 
const rawsummary = await airunner('llama-3-sonar-large-32k-online',summarypropmt,`Youtube video: https://www.youtube.com/watch?v=${scoredVideos[0].id}`)
try {
  summary=djson.parse(rawsummary.response);
} catch (e) {
  console.log(e)
}

console.log(`Youtube video: https://www.youtube.com/watch?v=${scoredVideos[0].id}`)

const transcriptions = [transcript1,transcript2,transcript3].join('\n')
let keywordslist = null;

const rawkeywordlist = await airunner(model,keywordsprompt,`topic: ${topic}\nDescription: ${details}\n. Output as JSON only without anything else ,without json key just parseble json object , using this template: {keywords: ['keyword1', 'keyword2']}`)
//console.log(rawtitlelist)
let keywordlist :{keywords:string[]}= {keywords:[]}
try {
  keywordlist=djson.parse(rawkeywordlist.response);
} catch (e) {
  console.log(e)
}

keywordslist = (keywordlist.keywords.length>0)? keywordlist.keywords.join("\n"):""
      
let titlelist=null;
  
const rawtitlelist = await airunner(model,titleprompt,`topic: ${topic}\nDescription: ${details}\nSuccessful titles:\n${scoredVideos.map(video => video.title).join("\n")}. Output as JSON only without anything else,,without json key just parseble json object, using this template: {titles: ['title1', 'title2']}`)
try {
  titlelist = djson.parse(rawtitlelist.response);
}
catch (e){
console.log(e)
}


//console.log(rawtitlelist)

  const rawnewdescription = await airunner(model,descriptionprompt,` topic: ${topic}\nDescription: ${details}\n Output as JSON only without anything else, ,without json key just parseble json object, using this template: \n Long tail keywords to be included:${keywordslist}\n{'output': 'description of the video'} `)
  
  let newdescription=null

  try{
    newdescription = djson.parse(rawnewdescription.response).output;
  }
  catch(e){

  }
  
   

  //console.log(rawnewdescription)


  const rawemail = await airunner(model,announcementprompt,`topic: ${topic}\nDescription: ${newdescription}\nOutput as JSON only without anything else, ,without json key just parseble json object, using this template: \n{'output': 'text of the email'}`)
let email=null;
try {
  email = djson.parse(rawemail.response).output;
} catch(e){

}
 //const email = djson.parse(rawemail.response).output;

 // const rawcontent = await airunner(model,contentprompt,`Description: ${newdescription}\Transcript: ${transcriptions.substring(0,1000)}\nOutput as JSON only without anything else, without json key just parseble json object, using this template: \n{'content': 'text of the video'}`)

 // const content = djson.parse(rawcontent.response).content;
  

  response.status = "success";
  response.data = {
    scoredVideos,
    titlelist:`Successful Titles for the topic: ${topic}\n\n${titlelist.titles.map((s: string) => `- ${s}`).join("\n")}\n\n`,
    newdescription,
    email,
    keywordslist,
    transcriptions,
    summary
  // rawcontent
  };



  return response;
}