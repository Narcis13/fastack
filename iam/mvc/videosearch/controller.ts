/* Example doodads controller
 * Routes all doodad requests
 */

// Definitely much cleaner and neater

import { index, create } from "./model";
import { createRouter, defineEventHandler, useBase } from 'h3';

const router = createRouter();

// Routes /api/iam/doodads

// Get all doodads
router.get('/', defineEventHandler(async (event) => { 
  return await index(event) 
}));

// Create a doodad
router.post('/', defineEventHandler(async (event) => { 
  return await create(event) 
}));



export default useBase('/api/ai/videosearch', router.handler);
