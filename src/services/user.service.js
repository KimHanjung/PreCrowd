import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/src/user/";

const task_stat = () => {
  return axios.post(API_URL + "task_stat", { headers: authHeader() });
};

const task_member = (id) => {
  return axios.post(API_URL + "task_member", { headers: authHeader(), id: id });
};

export default {
  task_stat,
  task_member
};