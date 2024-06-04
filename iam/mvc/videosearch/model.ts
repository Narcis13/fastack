/* Example doodads model
 * Data manipulation of all doodad requests
 */

import { H3Event } from "h3";
import ollama from "ollama";
import type { JSONResponse } from "~~/iam/misc/types";
import { titleprompt, descriptionprompt, announcementprompt } from "~~/utils/media/prompts";
import * as djson from "dirty-json";
import {  videoSearchTool, videoDetailsTool } from "~~/utils/media/videoSearchTools";
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
  console.log(body)
  const topic = "subconcious mind"
  const details = "You are going to create extremely good and captivating videos about tapping into subconcious mind to develop yourself";
  
  const videos = await videoSearchTool(topic, 50)
  let scoredVideos = []
  for (const video of videos) {
    const videodetails = await videoDetailsTool(video);
    scoredVideos.push(videodetails);
  }
  
  scoredVideos = scoredVideos.sort((a, b) => b.score - a.score).slice(0, 15);

  const rawtitlelist = await ollama.generate({
    model: "llama3",
    system: titleprompt, 
    format: "json",
    prompt: `topic: ${topic}\nDescription: ${details}\nSuccessful titles:\n${scoredVideos.map(video => video.title).join("\n")}. Output as JSON, using this template: {titles: ['title1', 'title2']}`,
  })
  const titlelist = JSON.parse(rawtitlelist.response);

  const rawnewdescription = await ollama.generate({
    model: "llama3",
    system: descriptionprompt,
    format: "json",
    prompt: ` topic: ${topic}\nDescription: ${details}\n Output as JSON, using this template: \n\n{'output': 'description of the video'} `
  });
  const newdescription = djson.parse(rawnewdescription.response).output;
  //console.log(`Description for the video based on: ${details}\n${newdescription}\n\n`);
  
  const rawemail = await ollama.generate({
    model: "llama3",
    system: announcementprompt,
    format: "json",
    prompt: `topic: ${topic}\nDescription: ${newdescription}\nOutput as JSON, using this template: \n{'output': 'text of the email'}`,
  });
  const email = djson.parse(rawemail.response).output;
  
  //console.log(`Email for the video based on the generated description: \n${email}\n\n`);


 // const info = "create a doodad"  
  response.status = "success";
  response.data = {
    scoredVideos,
    titlelist:`Successful Titles for the topic: ${topic}\n\n${titlelist.titles.map((s: string) => `- ${s}`).join("\n")}\n\n`,
    newdescription,
    email
  };



  return response;
}