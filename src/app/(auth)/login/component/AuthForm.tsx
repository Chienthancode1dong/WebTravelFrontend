'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import AuthHeader from "./AuthHeader";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import EmailVerificationModal from "./EmailVerificationModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import FPInputEmailModal from "./FPInputEmailModal";
import SocialLoginButtons from "./SocialLoginButtons";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showForgotPasswordEmailModal, setShowForgotPasswordEmailModal] = useState(false);
    const [showForgotPasswordVerificationModal, setShowForgotPasswordVerificationModal] = useState(false);
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordToken, setForgotPasswordToken] = useState('');

    const router = useRouter();

    const toggleView = (view: string) => {
        setIsLogin(view === 'login');
    }; const onRegistrationSuccess = (email: string) => {
        setRegistrationEmail(email);
        setShowVerificationModal(true);
    };
    const onForgotPasswordClick = () => {
        setShowForgotPasswordEmailModal(true);
    };

    const onForgotPasswordEmailSent = (email: string) => {
        setForgotPasswordEmail(email);
        setShowForgotPasswordEmailModal(false);
        setShowForgotPasswordVerificationModal(true);
    };

    const onForgotPasswordVerified = (token?: string) => {
        if (token) {
            setForgotPasswordToken(token);
        }
        setShowForgotPasswordVerificationModal(false);
        setShowForgotPasswordModal(true);
    };

    const onVerificationEmail = async (email: string) => {
        setRegistrationEmail(email);
        setShowVerificationModal(true);
    };

    return (
        <div className="w-full md:w-1/2 p-8 space-y-6">
            <AuthHeader
                title={isLogin ? 'Journey Begins' : 'Join the Adventure'}
                description={isLogin ? 'Log In with Open account' : 'Create your travel account'}
            />            <AuthTabs isLogin={isLogin} onToggle={toggleView} />
            <SocialLoginButtons key={isLogin ? 'login' : 'signup'} />
            <div className="relative overflow-hidden h-[320px]">
                <div className={`transition-transform duration-500 ease-in-out absolute w-full 
                    ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
                    <LoginForm
                        onForgotPassword={onForgotPasswordClick}
                        onVerificationEmail={onVerificationEmail}
                    />
                </div>

                <div className={`transition-transform duration-500 ease-in-out absolute w-full 
                    ${!isLogin ? 'translate-x-0' : 'translate-x-full'}`}>
                    <SignupForm
                        onRegistrationSuccess={onRegistrationSuccess}
                    />
                </div>
            </div>
            <EmailVerificationModal
                isOpen={showVerificationModal}
                onClose={() => setShowVerificationModal(false)}
                onSuccess={() => {
                    setShowVerificationModal(false);

                    if (isLogin) {
                        // Nếu đang ở login flow, thông báo thành công và redirect
                        toast.success('Email Verified Successfully! Redirecting to home page...');
                        // Có thể tự động login lại hoặc để user login manual
                        router.push('/');
                    } else {
                        // Nếu đang ở signup flow, chuyển về login
                        setIsLogin(true);
                        toast.success('Registration Complete - Your account has been verified! Please login to continue');
                        toggleView('login');
                    }
                }} email={registrationEmail}
                type={isLogin ? 'login' : 'signup'}
            />

            {/* Nhập email để gửi mã reset password  */}
            <FPInputEmailModal
                isOpen={showForgotPasswordEmailModal}
                onClose={() => setShowForgotPasswordEmailModal(false)}
                onVerificationEmail={onForgotPasswordEmailSent}
            />

            {/* Xác thực email*/}
            <EmailVerificationModal
                isOpen={showForgotPasswordVerificationModal}
                onClose={() => setShowForgotPasswordVerificationModal(false)}
                onSuccess={onForgotPasswordVerified}
                email={forgotPasswordEmail}
                type="forgot-password"
            />

            {/* Forgot Password Reset Modal */}
            <ForgotPasswordModal
                isOpen={showForgotPasswordModal}
                onClose={() => setShowForgotPasswordModal(false)}
                email={forgotPasswordEmail}
                token={forgotPasswordToken}
            />
        </div>
    );
}

export default AuthForm;