'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthHeader from "./AuthHeader";
import AuthTabs from "./AuthTabs";
import SocialLoginButtons from "./SocialLoginButtons";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import EmailVerificationModal from "./EmailVerificationModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import FPInputEmailModal from "./FPInputEmailModal";


// Define ToastHook interface để tránh circular dependency
interface ToastHook {
    showSuccess: (title: string, message?: string) => void;
    showError: (title: string, message?: string) => void;
    showWarning: (title: string, message?: string) => void;
    showInfo: (title: string, message?: string) => void;
}

interface AuthFormProps {
    toast?: ToastHook;
}

// Types for form data
interface LoginFormData {
    email: string;
    password: string;
}

interface SignupFormData {
    fullName: string;
    email: string;
    password: string;
}

const AuthForm = ({ toast }: AuthFormProps = {}) => {
    // Provide fallback functions if no toast is provided
    const safeToast: ToastHook = {
        showSuccess: toast?.showSuccess || ((title, message) => console.log('Success:', title, message)),
        showError: toast?.showError || ((title, message) => console.error('Error:', title, message)),
        showWarning: toast?.showWarning || ((title, message) => console.warn('Warning:', title, message)),
        showInfo: toast?.showInfo || ((title, message) => console.info('Info:', title, message))
    }; const [isLogin, setIsLogin] = useState(true);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showForgotPasswordEmailModal, setShowForgotPasswordEmailModal] = useState(false);
    const [showForgotPasswordVerificationModal, setShowForgotPasswordVerificationModal] = useState(false);
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordToken, setForgotPasswordToken] = useState(''); // Token từ verification

    const router = useRouter();

    const toggleView = (view: string) => {
        setIsLogin(view === 'login');
        setError(null);
    };

    const onLoginSubmit = async (data: any) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authApi.login(data.email, data.password);
            // Lưu token và thông tin người dùng
            localStorage.setItem('access_token', response.accessToken);
            try {
                const user = await authApi.getProfile();
                localStorage.setItem('userId', user.userId);
                localStorage.setItem('email', user.email);
                localStorage.setItem('role', user.role || 'USER');
            } catch (error: any) {
                const userErrorMessage = error.response?.data?.message || 'Failed to fetch user profile';
                safeToast.showError('Profile Fetch Failed', userErrorMessage);
                console.error('Profile fetch error:', userErrorMessage);
            }
            safeToast.showSuccess('Login Successful', 'Welcome back! Redirecting to dashboard...');
            setTimeout(() => {
                router.push('/');
            }, 1500);

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
            setError(errorMessage);
            safeToast.showError('Login Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const onSignupSubmit = async (data: any) => {
        try {
            setLoading(true);
            setError(null);

            // Store email for verification modal
            setRegistrationEmail(data.email);

            // Call signup API
            const response = await authApi.register(data.fullName, data.email, data.password);

            // Show verification modal after successful registration  
            setShowVerificationModal(true);
            safeToast.showSuccess('Registration Successful', 'Please check your email for verification code');

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
            setError(errorMessage);
            safeToast.showError('Registration Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const onForgotPassword = async (email: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authApi.forgotPassword(email);

            setForgotPasswordEmail(email);
            setShowForgotPasswordModal(true);
            safeToast.showInfo('Reset Email Sent', 'Please check your email for password reset instructions');

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to send reset email';
            setError(errorMessage);
            safeToast.showError('Reset Email Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }; const onResetPassword = async (data: { password: string; confirmPassword: string }) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authApi.resetPassword(forgotPasswordEmail, data.password);

            setShowForgotPasswordModal(false);
            setIsLogin(true);
            setError(null);
            safeToast.showSuccess('Password Reset Successful', 'Please login with your new password');

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to reset password';
            setError(errorMessage);
            safeToast.showError('Password Reset Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        
            <SocialLoginButtons />

    );
}

export default AuthForm;