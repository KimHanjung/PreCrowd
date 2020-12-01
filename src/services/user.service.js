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

export default {
  create_task,
  create_original,
};