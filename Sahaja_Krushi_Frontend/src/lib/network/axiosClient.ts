// services/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api/V1", // ✅ Your news project base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request Interceptor
axiosClient.interceptors.request.use((config) => {
  // Add authentication token to requests
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle Unauthorized (401)
    if (error?.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      // Redirect to login if not already there
      if (window.location.pathname !== '/auth/login' && window.location.pathname !== '/auth/superadmin-login') {
        window.location.href = '/auth/login';
      }
    }

    // Handle validation errors (400)
    if (error?.response?.status === 400 && error?.response?.data) {
      return Promise.resolve(error.response);
    }

    // Generic error handler
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject(new Error(errorMsg));
  }
);

export default axiosClient;
