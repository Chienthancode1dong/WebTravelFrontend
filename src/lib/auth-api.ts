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
            fullName,
            email,
            password
        });
        return response.data;
    },

    // Verify Email
    async verifyEmail(email: string, otp: string) {
        const response = await apiClient.post(ENDPOINTS.VERIFY_EMAIL, {
            email,
            otp
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

    // Forgot Password
    async forgotPassword(email: string) {
        const response = await apiClient.post(ENDPOINTS.FORGOT_PASSWORD, {
            email
        });
        return response.data;
    },

    // Reset Password
    async resetPassword(email: string, password: string) {
        const response = await apiClient.post(ENDPOINTS.RESET_PASSWORD, {
            email,
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
    }
};

export default authApi;
