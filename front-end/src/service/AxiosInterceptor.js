import axios from "axios";
import { apiUrl } from "../helper/const";
import {
  DASHBOARD_AUTH_KEY,
  getDashboardAuth,
  setDashboardAuth,
} from "../modules/dashboard/auth";
import HttpRequest from "./HttpRequest";

axios.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    // console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    // If the response has a success field, return the data directly
    // console.log("Response Interceptor:", response);

    // 404 unauthorized
    if (response.status === 404) {
      console.warn("Resource not found:", response.config.url);
      return Promise.reject(new Error("Resource not found"));
    }

    return response;
  },
  async (error) => {
    let config = error.config || {};
    if (
      error.response.status === 401 &&
      !config.url.endsWith("/api/auth/login") &&
      !config.url.endsWith("/refresh-token") &&
      !config._isRetry
    ) {
      config._isRetry = true;
      const auth = getDashboardAuth();
      return await HttpRequest.post(apiUrl + "api/auth/refresh-token", {
        refreshToken: auth?.refreshToken,
      })
        .then(async (res) => {
          setDashboardAuth(res.data);
          config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
          const response = await axios(config); // Retry original request with new token
          return response;
        })
        .catch((refreshError) => {
          localStorage.removeItem(DASHBOARD_AUTH_KEY); // Clear auth on refresh failure
          window.location.href = "/dashboard/login";
          window.location.reload();
          // Optionally, you can clear auth tokens here if refresh fails
          return Promise.reject(refreshError);
        });
    }
    console.error("Response Error Interceptor:", error);
    return Promise.reject(error);
  },
);

export default axios;
