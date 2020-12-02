import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/src/user/";


const create_task = (taskname, term, desc, pass, tablename, tableschema, originalschema) => {
  return axios.post(API_URL + "create_task", {
    taskname,
    term,
    desc,
    pass,
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

const get_approval = (Task_name) => {
  return axios.post(API_URL + "get_approval", {
    Task_name
  })
  .then((response) => {
    return response.data.result;
  });
};

const modify_approval = (id, taskname, status) => {
  return axios.post(API_URL + "modify_approval", {
    id, taskname, status
  })
};

const delete_task = (Task_name) => {
  return axios.post(API_URL + "delete_task", {
    Task_name
  });
};

const set_pass = (pass, taskname) => {
  return axios.post(API_URL + "set_pass", {
    pass, taskname
  });
};


export default {
  create_task,
  create_original,
  get_task,
  delete_task,
  get_approval,
  modify_approval,
  set_pass,
};