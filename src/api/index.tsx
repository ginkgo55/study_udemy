import axios from 'axios';

const KEY = 'AIzaSyAmmN1LavK1301cSeNz2kM1tf5A1c1s9cU';

const youtube = axios.create({
  baseURL : 'https://www.googleapis.com/youtube/v3'
})

const params = {
  part: 'snippet',
  maxResults: 50,
  key: KEY,
  regionCode: 'JP',
  type: 'video',
}

export const fetchPopularData = async() => {
  return await youtube.get('/videos', {
    params: {
      ...params,
      chart: 'mostPopular'
    }
  })
}

export const fetchSelectedData = async(id:string) => {
  return await youtube.get('videos', {
    params: {
      ...params,
      id
    }
  })
}

export const fetchRelatedData = async(id:string) => {
  return await youtube.get('/search', {
    params: {
      ...params,
      relatedVideoId: id
    }
  })
}

export const fetchSearchData = async(query:string) => {
  return await youtube.get('/search', {
    params: {
      ...params,
      q: query
    }
  })
}