import apiClient from './api-client';
import { ENDPOINTS } from './api-config';

// Simple logout function - calls backend to clear cookies
export const logoutUser = async () => {
    try {
        await apiClient.post(ENDPOINTS.LOGOUT);
    } catch (error) {
        console.error('Logout API error:', error);
    } finally {
        localStorage.clear();
        window.location.href = '/login';
    }
};
