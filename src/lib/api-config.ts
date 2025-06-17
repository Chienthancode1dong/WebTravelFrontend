// Simple API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// API Endpoints
export const ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/signup',
  VERIFY_EMAIL: '/auth/verify',
  SEND_OTP: '/auth/send-verification',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_FORGOT_PASSWORD: '/auth/verify-forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
};

export default { API_BASE_URL, ENDPOINTS };
