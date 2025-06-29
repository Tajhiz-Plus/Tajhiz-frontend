import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

// Global error handler
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Optional: redirect to login or refresh token
      console.error("Unauthorized — maybe redirect or logout");
    }
    return Promise.reject(err);
  }
);

export default API;
