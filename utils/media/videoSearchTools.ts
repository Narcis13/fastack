

type VideoSearchResults = {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  daysSincePublished: number;
  duration?:any;
}

type VideoDetails = {
  videoString: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  subscriberCount: number;
  score: number;
  videoUrl:string;
  id:string;
  duration?:any;
}



export const videoSearchTool = async (topic: string, maxResults: number = 35): Promise<VideoSearchResults[]> => {

  const results: VideoSearchResults[] = [];
  topic = encodeURIComponent(topic);
  const apiKey = useRuntimeConfig().youtube_api_key;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${topic}&type=video&key=${apiKey}`;
//console.log(apiKey)
  const response = await fetch(url);
  const data = await response.json();

  if (data.items) {
    for (const item of data.items) {
      //console.log(item)
      const id = item.id.videoId;
      const title = item.snippet.title;
      const channelId = item.snippet.channelId;
      const channelTitle = item.snippet.channelTitle;
    //  const duration = item.contentDetails.duration;
      const daysSincePublished = Math.floor((new Date().getTime() - new Date(item.snippet.publishedAt.slice(0, 10)).getTime())/(1000*60*60*24)); 

      results.push({
        id,
        title,
        channelId,
        channelTitle,
        daysSincePublished,
       // duration
      });
    }
  }

  return results;
}

export const videoDetailsTool = async (video: VideoSearchResults): Promise<VideoDetails> => {
  const apiKey = useRuntimeConfig().youtube_api_key;
  const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${video.id}&key=${apiKey}`;
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${video.channelId}&key=${apiKey}`;

  const videoResponse = await fetch(videoUrl);
  const channelResponse = await fetch(channelUrl);

  const videoData = await videoResponse.json();
  const channelData = await channelResponse.json();
 // console.log('Stats',videoData.items[0].contentDetails?.duration.replace(/(^PT|S$)/g, "").split(/[^\d]/).map((item) => item.length < 2 ? "0" + item : item).join(":").replace(/^0/, ""))
  const title = videoData.items[0].snippet.title;
  const viewCount = (videoData.items[0].statistics.viewCount as number);
  const likeCount = videoData.items[0].statistics.likeCount;
  const commentCount = videoData.items[0].statistics.commentCount;
  const subscriberCount = channelData.items[0].statistics.subscriberCount;
  const duration = video.duration;
  const videoString = `   - Title: ${title}\n   - Channel: ${video.channelTitle}\n   - View Count: ${Number(viewCount).toLocaleString()}\n   - Days Since Published: ${video.daysSincePublished}\n   - Likes: ${Number(likeCount).toLocaleString()}\n   - Subscriber Count: ${Number(subscriberCount).toLocaleString('en-US')}\n   - Video URL: https://www.youtube.com/watch?v=${video.id}\n`;

  // const score = (viewCount / video.daysSincePublished / subscriberCount) + (likeCount * 10) + (commentCount * 100);
  const score = (((viewCount / subscriberCount) * 0.4) + ((likeCount / viewCount) * 0.3) + ((commentCount / viewCount) * 0.2) * (1/video.daysSincePublished)) ;

  return {
    videoString, 
    title,
    viewCount,
    likeCount,
    commentCount,
    subscriberCount,
    score,
    videoUrl,
    id:video.id,
    duration
  };
}




