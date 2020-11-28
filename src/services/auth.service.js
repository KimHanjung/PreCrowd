import axios from "axios";

const API_URL = "http://localhost:4000/src/auth/";

const register = (username, id, password, role) => {
  return axios.post(API_URL + "signup", {
    username,
    id,
    password,
    role,
  });
};

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

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};