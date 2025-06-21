import { signInWithPopup } from 'firebase/auth';
import { auth, facebookProvider, twitterProvider } from './firebase';
import { API_BASE_URL, ENDPOINTS } from './api-config';

export interface SocialLoginResponse {
    success: boolean;
    user?: any;
    message?: string;
}

export const loginWithFacebook = async (): Promise<SocialLoginResponse> => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const idToken = await result.user.getIdToken(); const response = await fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN_FACEBOOK}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                idToken
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Facebook login failed');
        }

        return {
            success: true,
            user: data.user,
            message: 'Facebook login successful'
        };
    } catch (error: any) {
        console.error('Facebook login error:', error);

        if (error.code === 'auth/popup-closed-by-user') {
            return {
                success: false,
                message: 'Login cancelled by user'
            };
        }

        if (error.code === 'auth/popup-blocked') {
            return {
                success: false,
                message: 'Popup blocked by browser. Please allow popups for this site.'
            };
        }

        return {
            success: false,
            message: error.message || 'Facebook login failed'
        };
    }
};

export const loginWithTwitter = async (): Promise<SocialLoginResponse> => {
    try {
        const result = await signInWithPopup(auth, twitterProvider);
        const idToken = await result.user.getIdToken();        // Send idToken to backend
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN_TWITTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                idToken
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Twitter login failed');
        }

        return {
            success: true,
            user: data.user,
            message: 'Twitter login successful'
        };
    } catch (error: any) {
        console.error('Twitter login error:', error);

        if (error.code === 'auth/popup-closed-by-user') {
            return {
                success: false,
                message: 'Login cancelled by user'
            };
        }

        if (error.code === 'auth/popup-blocked') {
            return {
                success: false,
                message: 'Popup blocked by browser. Please allow popups for this site.'
            };
        }

        return {
            success: false,
            message: error.message || 'Twitter login failed'
        };
    }
};
