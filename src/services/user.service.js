import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/src/user/";


const create_task = (taskname, term, desc, tablename, tableschema, originalschema) => {
  return axios.post(API_URL + "create_task", {
    taskname,
    term,
    desc,
    tablename,
    tableschema,
    originalschema
  });
};

const create_original = (originalname, originalschema, taskname) => {
  return axios.post(API_URL + "create_original", {
    originalname,
    originalschema,
    taskname
  });
};

const get_task = () => {
  return axios.post(API_URL + "get_task", {
  })
  .then((response) => {

    return response.data.users;
  });
};

const delete_task = (Task_name) => {
  return axios.post(API_URL + "delete_task", {
    Task_name
  });
};

export default {
  create_task,
  create_original,
  get_task,
  delete_task,
};