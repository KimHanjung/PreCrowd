import blob from 'blob';
import axios from 'axios';

export const getDownloadFile = async() => {
  return axios.get('/src/api/download?id=hongsun4', {
    responseType: blob,
  })
  .then(response => response.blob())
}