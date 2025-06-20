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
  LOGIN_FACEBOOK: '/auth/facebook',
  GETTOURS: 'postTour',
  HOTEL:(hotelId:string) =>`rooms/${hotelId}`,
  DELETEHOTEL:(hotelId:string,roomId:string) => `rooms/${hotelId}?room_id=${roomId}`,
  STATUSHOTEL:(roomId:string)=> `rooms/status/${roomId}`,
};

export default { API_BASE_URL, ENDPOINTS };
