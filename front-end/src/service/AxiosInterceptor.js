import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    console.log("Request Interceptor:", config);
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
  (error) => {
    console.error("Response Error Interceptor:", error);
    return Promise.reject(error);
  },
);

export default axios;
