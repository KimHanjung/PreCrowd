import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://165.132.105.42:3020/src/auth/";

const management = (id, task, gender, byear1, byear2, role) =>{
  return axios.post(API_URL + "management",{
    id,
    task,
    gender,
    byear1,
    byear2,
    role
  })
  .then((response) => {

    return response.data.users;
  });
};
const takeeva = (user_id) => {
  return axios.post(API_URL+"takeeva",{
    user_id
  })
  .then((response) =>{
    return response.data.eva;
  });
};
const takesub = (user_id) => {
  return axios.post(API_URL+"takesub",{
    user_id
  })
  .then((response) =>{
    return response.data.sub;
  });
};
const taketask = () =>{
  return axios.post(API_URL + "taketask")
  .then((response) =>{
    return response.data.task_list;
  });
};
const register = (username, id, password, address, gender, bdate, phone, role) => {
  return axios.post(API_URL + "signup", {
    username,
    id,
    password,
    address,
    gender,
    bdate,
    phone,
    role,
  });
};

const withdrawal = () => {
  const id = JSON.parse(localStorage.getItem('user')).id;
  return axios.post(API_URL + "withdrawal", { headers: authHeader() , id: id})
          .then(() => {
            logout();
          })
          .catch((err) => console.log(err));
}

const login = (id, password) => {
  return axios
    .post(API_URL + "signin", {
      id,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const update = (id, address, phone) => {
  return axios.post(API_URL + "update", {headers: authHeader(),
    id,
    address,
    phone,
  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response;
  });
};

const password = (id, password) => {
  return axios.post(API_URL + "password", {headers: authHeader(),
    id,
    password
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  takeeva,
  takesub,
  taketask,
  register,
  withdrawal,
  login,
  logout,
  update,
  password,
  getCurrentUser,
  management,
};