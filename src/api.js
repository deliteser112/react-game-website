import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.imba.dev/',
  timeout: 15000,
  headers: {
    contentType: 'application/json'
  }
});


export const setDeviceId = (id)=>{
  client.interceptors.request.use(config => {
    config.headers.device_id = id;
    return config;
  });
};

export const getVideos = (orientation, pageNo, postPerPage)=>{
  return client.get(`/posts?web=true&orientation=${orientation}&from=${(pageNo-1)*postPerPage}&limit=${postPerPage}`);
};

export const getVideoById = (id)=>{
  return client.get(`/posts/${id}`);
};

export const getCommentsByVideoId = (videoId, commentPage, numOfCommentsPerPage)=>{
  return client.get(`/posts/${videoId}/comments?from=${(commentPage-1)*numOfCommentsPerPage}&limit=${numOfCommentsPerPage}`);
};

export const addVideoView = (videoId)=>{
  return client.post(`/posts/${videoId}/views`, {
    'from': 'Recommendation',
    'series': 1
  });
};