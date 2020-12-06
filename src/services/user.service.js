import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/src/user/";

const getfile = (row) => {
  return axios.post(API_URL + "getfile",{
    row
  })
    .then((response) =>{
      return response;
    });
};
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

const get_memberscore = (id) => {
  return axios.post(API_URL + "get_memberscore", {
    id
  })
  .then((response) => {
    return response;
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
}

const task_stat = () => {
  return axios.post(API_URL + "task_stat", { headers: authHeader() });
};

const task_member = (id) => {
  return axios.post(API_URL + "task_member", { headers: authHeader(), id: id });
};


export default {
  getfile,
  create_task,
  create_original,
  get_task,
  delete_task,
  get_approval,
  modify_approval,
  set_pass,
  task_stat,
  task_member,
  get_memberscore,
};