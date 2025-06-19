import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/lib/api-config';

// Simple Auth API functions
export const authApi = {
    // Login
    async login(email: string, password: string) {
        const response = await apiClient.post(ENDPOINTS.LOGIN, {
            username: email, // Backend expects 'username' field
            password
        });
        return response.data;
    },

    // Register/Signup  
    async register(fullName: string, email: string, password: string) {
        const response = await apiClient.post(ENDPOINTS.REGISTER, {
            name: fullName,
            email,
            password
        });
        return response.data;
    },

    // Verify Email
    async verifyEmail(email: string, otp: string) {
        const response = await apiClient.post(ENDPOINTS.VERIFY_EMAIL, {
            email,
            code: otp
        });
        return response.data;
    },

    // Resend OTP
    async resendOTP(email: string) {
        const response = await apiClient.post(ENDPOINTS.SEND_OTP, {
            email
        });
        return response.data;
    },

    // Verify Forgot Password OTP
    async verifyForgotPassword(email: string, otp: string) {
        const response = await apiClient.post(ENDPOINTS.VERIFY_FORGOT_PASSWORD, {
            email,
            code: otp
        });
        return response.data;
    },

    // Forgot Password
    async forgotPassword(email: string) {
        const response = await apiClient.post(ENDPOINTS.FORGOT_PASSWORD, {
            email
        });
        return response.data;
    },

    // Reset Password
    async resetPassword(token: string, password: string) {
        const response = await apiClient.post(ENDPOINTS.RESET_PASSWORD, {
            token,
            password
        });
        return response.data;
    },

    // Logout
    async logout() {
        const response = await apiClient.post(ENDPOINTS.LOGOUT);
        // Clear local storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        return response.data;
    },

    // Get Profile
    async getProfile() {
        const response = await apiClient.get(ENDPOINTS.PROFILE);
        return response.data;
    },

    // Facebook Sign In
    async FacebookSignIn(data: { access_token: string }) {
        const response = await apiClient.post(ENDPOINTS.LOGIN_FACEBOOK, data);
        return response.data;
    },

    // Create Hotel
    async createHotel(data: any) {
        const response = await apiClient.post(ENDPOINTS.CREATEHOTEL, data,{headers: {'Content-Type': 'multipart/form-data'}});
        return response.data;
    },

    async getAllTours() {
        const response = await apiClient.get(ENDPOINTS.GETTOURS);
        return response.data;
    },
    async getTourById(id: string) {
        const response = await apiClient.get(`${ENDPOINTS.GETTOURS}/${id}`);
        return response.data;
    }
};

export default authApi;
