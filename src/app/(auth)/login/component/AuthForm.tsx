'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import authApi from "@/lib/auth-api";
import AuthHeader from "./AuthHeader";
import AuthTabs from "./AuthTabs";
import SocialLoginButtons from "./SocialLoginButtons";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import ForgotPasswordModal from "./ForgotPasswordModal";
import EmailVerificationModal from "./EmailVerificationModal";

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

const AuthForm = ({ toast }: AuthFormProps = {}) => {    // Provide fallback functions if no toast is provided
    const safeToast: ToastHook = {
        showSuccess: toast?.showSuccess || ((title, message) => console.log('Success:', title, message)),
        showError: toast?.showError || ((title, message) => console.error('Error:', title, message)),
        showWarning: toast?.showWarning || ((title, message) => console.warn('Warning:', title, message)),
        showInfo: toast?.showInfo || ((title, message) => console.info('Info:', title, message))
    };

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

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
            } catch (error: unknown) {
                let userErrorMessage = 'Failed to fetch user profile';
                if (typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object' && (error as any).response !== null && 'data' in (error as any).response) {
                    userErrorMessage = (error as any).response.data?.message || userErrorMessage;
                } else if (error instanceof Error) {
                    userErrorMessage = error.message;
                }
                safeToast.showError('Profile Fetch Failed', userErrorMessage);
                console.error('Profile fetch error:', userErrorMessage);
            }
            safeToast.showSuccess('Login Successful', 'Welcome back! Redirecting to dashboard...');
            setTimeout(() => {
                router.push('/');
            }, 1500);

        } catch (error: unknown) {
            let errorMessage = 'An unexpected error occurred';
            if (typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object' && (error as any).response !== null && 'data' in (error as any).response) {
                errorMessage = (error as any).response.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
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

        } catch (error: unknown) {
            let errorMessage = 'An unexpected error occurred';
            if (typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object' && (error as any).response !== null && 'data' in (error as any).response) {
                errorMessage = (error as any).response.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
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

        } catch (error: unknown) {
            let errorMessage = 'Failed to send reset email';
            if (typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object' && (error as any).response !== null && 'data' in (error as any).response) {
                errorMessage = (error as any).response.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
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

        } catch (error: unknown) {
            let errorMessage = 'Failed to reset password';
            if (typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object' && (error as any).response !== null && 'data' in (error as any).response) {
                errorMessage = (error as any).response.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            setError(errorMessage);
            safeToast.showError('Password Reset Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-1/2 p-8 space-y-6">
            <AuthHeader
                title={isLogin ? 'Journey Begins' : 'Join the Adventure'}
                subtitle=""
                description={isLogin ? 'Log In with Open account' : 'Create your travel account'}
            />

            <AuthTabs isLogin={isLogin} onToggle={toggleView} />

            <SocialLoginButtons />

            <div className="relative overflow-hidden h-[320px]">                <div className={`transition-transform duration-500 ease-in-out absolute w-full ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>                    <LoginForm
                onSubmit={onLoginSubmit}
                loading={loading}
                error={error}
                onForgotPassword={onForgotPassword}
                showWarning={safeToast.showWarning}
            />
            </div>

                <div className={`transition-transform duration-500 ease-in-out absolute w-full ${!isLogin ? 'translate-x-0' : 'translate-x-full'}`}>
                    <SignupForm
                        onSubmit={onSignupSubmit}
                        loading={loading}
                    />
                </div>
            </div>
            <EmailVerificationModal
                isOpen={showVerificationModal}
                onClose={() => setShowVerificationModal(false)}
                onSuccess={() => {
                    setShowVerificationModal(false);
                    setIsLogin(true);
                    setError(null);
                    safeToast.showSuccess('Email Verified', 'Your account has been verified successfully!');
                }}
                email={registrationEmail}
            />

            {/* Forgot Password Modal */}
            <ForgotPasswordModal
                isOpen={showForgotPasswordModal}
                onClose={() => setShowForgotPasswordModal(false)}
                onResetPassword={onResetPassword}
                email={forgotPasswordEmail}
                loading={loading}
                error={error}
            />
        </div>
    );
}

export default AuthForm;