import { YoutubeTranscript } from 'youtube-transcript';

export default defineEventHandler(async (event) =>{
    let text=''
   const textjson= await YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=7Ujs5NSnnVE')
      textjson.map(t=>{
        text+=t.text+' '
      })
    return {transcript:text}
    })