import videoSearchController from "~~/iam/mvc/videosearch/controller";

export default defineEventHandler(async (event) => {
    console.log('[...].ts')
  return videoSearchController(event);
});