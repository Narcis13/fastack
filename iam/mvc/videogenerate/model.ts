

import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
//import ollama from "ollama";
import type { JSONResponse } from "~~/iam/misc/types";
import airunner from "../agents/aiagent";
import * as djson from "dirty-json";


const prisma = new PrismaClient();


export async function hooksandtitles(event: H3Event): Promise<JSONResponse> {
    const response = {} as JSONResponse;  

    const body = await readBody(event);
   // console.log('run agent',event.context.params?.agent,body)
  //  const info = "generate videos"  + event.context.params?.agent
    let generated={}
    const rawtext = await airunner(body.model,body.systemprompt,body.userprompt)
    try {
      generated = djson.parse(rawtext.response);
    }
    catch (e){
    console.log(e)
    }
    response.status = "success";
    response.data = {
      generated
    };
  
    return response;
  }

  export async function saveiteration(event:H3Event): Promise<JSONResponse> {
  console.log('salvez iteratie')  
  const response= {} as JSONResponse
  const body = await readBody(event);

  await prisma.iteraratiivideo.create({
      data:{
        topic:body.topic,
        titlesandhooks:JSON.stringify(body.hooksandtitles),
        keywords:JSON.stringify(body.keywords),
        slides:JSON.stringify(body.slides),
        narrative:JSON.stringify(body.narrative),
        imageprompts:JSON.stringify(body.imageprompts),
        description:JSON.stringify(body.description)
    
      }
    })
  return response
  }

