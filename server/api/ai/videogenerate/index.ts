import videoSearchController from "~~/iam/mvc/videogenerate/controller";

export default defineEventHandler(async (event) => {
   //console.log('[...].ts')
  return videoSearchController(event);
});