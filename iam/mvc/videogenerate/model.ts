

import { H3Event } from "h3";
//import ollama from "ollama";
import type { JSONResponse } from "~~/iam/misc/types";
import airunner from "../agents/aiagent";
import * as djson from "dirty-json";

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