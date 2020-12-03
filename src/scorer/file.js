import blob from 'blob';
import axios from 'axios';

const API_URL = () =>{
  const myjson = JSON.parse(localStorage.getItem("user"));
  let url = 'http://localhost:3001/api/todolist?File_index=1';
  return url;
}
export const getDownloadFile = async() => {
  return axios.get('http://localhost:3001/api/todolist?File_index=34', 
  {
    responseType: blob,
  })
  .then(response => response.blob())
}