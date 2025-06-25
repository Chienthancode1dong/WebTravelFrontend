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
  LOGIN_GOOGLE: '/auth/google',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  INFORMATION: (userId: string) => `/users/profile/${userId}`,
  LOGIN_FACEBOOK: '/auth/facebook',
  CREATEHOTEL:'hotel',
  TOUR: 'postTour',
  SCHEDULE:'scheduleTour',
  GETTOURS: 'postTour',
  HOTEL:(hotelId:string) =>`rooms/${hotelId}`,
  DELETEHOTEL:(hotelId:string,roomId:string) => `rooms/${hotelId}?room_id=${roomId}`,
  STATUSHOTEL:(roomId:string)=> `rooms/status/${roomId}`,
  FEEDBACK:'/user-comment',
  ROOMBYID:(roomId:string) =>`rooms/hotel/${roomId}`,
  ROOM:'rooms',
  LOGIN_TWITTER: '/auth/twitter',
  HOTELS: '/hotels',
  BOOKINGS: '/bookings',
  REVIEWS: '/reviews',
} 

export default { API_BASE_URL, ENDPOINTS };
