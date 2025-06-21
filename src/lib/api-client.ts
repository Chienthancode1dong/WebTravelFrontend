import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, ENDPOINTS } from './api-config';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Send cookies automatically
});

// Track refresh state to prevent multiple simultaneous refresh calls
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function, reject: Function }> = [];

// Process queued requests after refresh
const processQueue = (error: any) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Response interceptor - handle 401 and auto-refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve: () => resolve(apiClient(originalRequest)), reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint - backend handles everything
        await axios.post(`${API_BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`, {}, {
          withCredentials: true,
          timeout: 15000
        });

        // Refresh successful, process queue and retry
        processQueue(null);
        return apiClient(originalRequest);

      } catch (refreshError) {
        // Refresh failed, clear auth and redirect
        processQueue(refreshError);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
