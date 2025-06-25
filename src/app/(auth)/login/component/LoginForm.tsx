'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import {authApi} from '@/lib/auth-api';
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import LoadingButton from "./LoadingButton";

interface LoginFormProps {
    onForgotPassword?: () => void; // Chỉ cần callback đơn giản
    onVerificationEmail?: (email: string) => void;
}

const LoginForm = ({ onForgotPassword, onVerificationEmail }: LoginFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();

    const onLoginSubmit = async (data: any) => {
        try {
            setLoading(true);
            setError(null); const response = await authApi.login(data.email, data.password);

            // Lưu thông tin user từ response vào localStorage
            if (response.data && response.data.user) {
                const user = response.data.user;
                localStorage.setItem('userId', user.id);
                localStorage.setItem('name', user.name);
                localStorage.setItem('role', user.role || 'USER');

                // Redirect dựa trên role
                if (user.role === 'ADMIN') {
                    setTimeout(() => {
                        router.push('/admin');
                    }, 1500);
                } else {
                    setTimeout(() => {
                        router.push('/');
                    }, 1500);
                }
            }
            reset();
            toast.success('Login Successful!');

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            const errorCode = error.response?.status;
            console.error('Login error:', errorMessage);
            console.error('Error code:', errorCode);

            // Kiểm tra nếu email chưa được verify
            if (errorCode === 400) {
                try {
                    // Tự động gửi lại email verification
                    await authApi.resendOTP(data.email);
                    toast.info('Email Verification Required - Verification code has been sent to your email');

                    // Mở modal verification
                    if (onVerificationEmail) {
                        onVerificationEmail(data.email);
                    }
                } catch (resendError: any) {
                    console.error('Failed to resend OTP:', resendError);
                    // Nếu gửi email thất bại, vẫn mở modal để user có thể resend manually
                    toast.warning('Email Verification Required - Please verify your email to continue. Click resend in the verification modal.');
                    if (onVerificationEmail) {
                        onVerificationEmail(data.email);
                    }
                }
            } else {
                // Các lỗi khác (sai password, email không tồn tại, etc.)
                setError(errorMessage);
                toast.error(`Login Failed: ${errorMessage}`);
            }
        } finally {
            setLoading(false);
        }
    }; const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onForgotPassword) {
            onForgotPassword();
        }
    };

    return (
        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4 px-8">
            <InputField
                label="Email"
                type="email"
                register={(options: any) => register("email", options)}
                required={true}
            />

            <PasswordInput
                label="Password"
                register={(options: any) => register("password", options)}
                required={true}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded border-gray-300 text-black focus:ring-0" />
                    Remember me
                </label>                <span
                    onClick={handleForgotPassword}
                    className="text-gray-600 hover:underline cursor-pointer"
                >
                    Forgot Password?
                </span>
            </div>
            <LoadingButton
                type="submit"
                loading={loading}
                loadingText="Logging in..."
            >
                Log In
            </LoadingButton>
        </form>
    );
};

export default LoginForm;
