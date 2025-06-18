'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import authApi from '@/lib/auth-api';
import InputField from './InputField';
import LoadingButton from './LoadingButton';

interface ToastHook {
    showSuccess: (title: string, message?: string) => void;
    showError: (title: string, message?: string) => void;
    showInfo: (title: string, message?: string) => void;
}

interface ForgotPasswordEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerificationEmail: (email: string) => void; // Callback để mở modal reset password
    toast: ToastHook;
}

interface ForgotPasswordEmailForm {
    email: string;
}

const FPInputEmailModal = ({
    isOpen,
    onClose,
    onVerificationEmail,
    toast
}: ForgotPasswordEmailModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordEmailForm>();

    const onSubmit = async (data: ForgotPasswordEmailForm) => {
        try {
            setLoading(true);
            setError(null);

            // Gửi email reset password
            await authApi.forgotPassword(data.email);

            toast.showSuccess('Reset Email Sent', 'Please check your email for password reset instructions');

            // Gọi callback với email để mở modal reset password
            onVerificationEmail(data.email);
            onClose();
            reset();

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to send reset email';
            setError(errorMessage);
            toast.showError('Failed to Send Email', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        reset();
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                    <p className="text-gray-600 text-sm">
                        No worries! Enter your email address and we'll send you a secure link to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">                    
                    <InputField
                    label="Email Address"
                    type="email"
                    register={(options: any) => register("email", {
                        required: "Email address is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address"
                        }
                    })}
                    required={true}
                    placeholder="Enter your registered email address"
                />


                    {/* Validation Error */}
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}

                    {/* API Error */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            loadingText="Sending..."
                            className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Send Reset Email
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FPInputEmailModal;
