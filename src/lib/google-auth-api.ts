import { API_BASE_URL, ENDPOINTS } from "./api-config";

interface GoogleAuthResponse {
    success: boolean;
    data?: any;
    message?: string;
}

export const googleAuthApi = {

    loginWithGoogle: async (tokenOrCode: string): Promise<GoogleAuthResponse> => {
        try {

            const isIdToken = tokenOrCode.includes('.');
            const payload = isIdToken
                ? { idToken: tokenOrCode }
                : { code: tokenOrCode }; const response = await fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN_GOOGLE}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', 
                    body: JSON.stringify(payload),
                });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Google login failed');
            }

            return {
                success: true,
                data: data
            };
        } catch (error: any) {
            console.error('Google Auth API Error:', error);
            return {
                success: false,
                message: error.message || 'Network error occurred'
            };
        }
    }
};
