import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://movie-project-bk-630243095989.us-central1.run.app/api/chat",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;