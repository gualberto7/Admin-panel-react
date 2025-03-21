import axios from "axios";
import { API_BASE_URL } from "../../core/config/api.config";
import Cookies from "js-cookie";
import { navigationStore } from "./navigation.store";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("csrftoken");
    if (token) {
      config.headers["X-CSRFToken"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 419) {
      const navigate = navigationStore.getNavigate();
      if (navigate) {
        navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
