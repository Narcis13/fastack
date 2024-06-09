/* Example doodads model
 * Data manipulation of all doodad requests
 */

import { H3Event } from "h3";
//import ollama from "ollama";
import type { JSONResponse } from "~~/iam/misc/types";
import { titleprompt, descriptionprompt, announcementprompt , keywordsprompt} from "~~/utils/media/prompts";
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
  response.status = "success";
  response.data = {
    info,
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

  let transcript1=''
  const textjson1= await YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=7Ujs5NSnnVE')
     textjson1.map(t=>{
       transcript1+=t.text+' '
     })

const rawkeywordlist = await airunner(model,keywordsprompt,`topic: ${topic}\nDescription: ${details}\n. Output as JSON only without anything else ,without json key just parseble json object , using this template: {keywords: ['keyword1', 'keyword2']}`)
//console.log(rawtitlelist)
let keywordlist :{keywords:string[]}= {keywords:[]}
try {
  keywordlist=djson.parse(rawkeywordlist.response);
} catch (e) {
  console.log(e)
}

const keywordslist = (keywordlist.keywords.length>0)? keywordlist.keywords.join("\n"):""
      

  
const rawtitlelist = await airunner(model,titleprompt,`topic: ${topic}\nDescription: ${details}\nSuccessful titles:\n${scoredVideos.map(video => video.title).join("\n")}. Output as JSON only without anything else,,without json key just parseble json object, using this template: {titles: ['title1', 'title2']}`)

const titlelist = djson.parse(rawtitlelist.response);

//console.log(rawtitlelist)

  const rawnewdescription = await airunner(model,descriptionprompt,` topic: ${topic}\nDescription: ${details}\n Output as JSON only without anything else, ,without json key just parseble json object, using this template: \n Long tail keywords to be included:${keywordslist}\n{'output': 'description of the video'} `)
  const newdescription = djson.parse(rawnewdescription.response).output;

  //console.log(rawnewdescription)


  const rawemail = await airunner(model,announcementprompt,`topic: ${topic}\nDescription: ${newdescription}\nOutput as JSON only without anything else, ,without json key just parseble json object, using this template: \n{'output': 'text of the email'}`)

  const email = djson.parse(rawemail.response).output;
  

  response.status = "success";
  response.data = {
    scoredVideos,
    titlelist:`Successful Titles for the topic: ${topic}\n\n${titlelist.titles.map((s: string) => `- ${s}`).join("\n")}\n\n`,
    newdescription,
    email,
    keywordslist,
    transcript1
  };



  return response;
}