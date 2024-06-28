import { hooksandtitles , saveiteration} from "./model";
import { createRouter, defineEventHandler, useBase } from 'h3';

const router = createRouter();

/*
router.get('/', defineEventHandler(async (event) => { 
  return await index(event) 
}));
*/

router.post('/', defineEventHandler(async (event) => { 
  return await saveiteration(event) 
}));

router.post('/:agent', defineEventHandler(async (event) => { 
  return await hooksandtitles(event) 
}));

export default useBase('/api/ai/videogenerate', router.handler);