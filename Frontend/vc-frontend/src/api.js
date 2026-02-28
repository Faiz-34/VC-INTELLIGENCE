import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API,
});

export default api;