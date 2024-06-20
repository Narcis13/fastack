

import { H3Event } from "h3";
//import ollama from "ollama";
import type { JSONResponse } from "~~/iam/misc/types";


export async function hooksandtitles(event: H3Event): Promise<JSONResponse> {
    const response = {} as JSONResponse;  
    //console.log('index doodads',event)
    const info = "generate videos"  

    response.status = "success";
    response.data = {
      info
    };
  
    return response;
  }