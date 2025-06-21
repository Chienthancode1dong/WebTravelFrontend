'use client'
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import authApi from '@/lib/auth-api';

interface EmailVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (token?: string) => void; // Callback when verification successful, với token cho forgot-password
    email: string;
    type?: 'signup' | 'login' | 'forgot-password';
    title?: string; // Custom title
    description?: string; // Custom description
}

const EmailVerificationModal = ({
    isOpen,
    onClose,
    onSuccess,
    email,
    type = 'signup',
    title = '',
    description = ''
}: EmailVerificationModalProps) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [countdown, setCountdown] = useState(60);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false); // Thêm state cho success
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setOtp(Array(6).fill(''));
            setCountdown(60);
            setLoading(false);
            setIsVerified(false); // Reset success state
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [isOpen]);

    // Countdown timer
    useEffect(() => {
        if (isOpen && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, countdown]);

    // Verify OTP
    const handleVerifyOTP = async (otpCode: string) => {
        if (otpCode.length !== 6) return;

        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));

            let result = null;
            if (type === 'forgot-password') {
                result = await authApi.verifyForgotPassword(email, otpCode);
                toast.success('Email Verified - You can now reset your password');
            } else {
                await authApi.verifyEmail(email, otpCode);
                toast.success('Email Verified Successfully - Your account has been verified');
            }
            setIsVerified(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            if (type === 'forgot-password' && result?.token) {
                onSuccess(result.token);
            } else {
                onSuccess();
            }
            onClose();

        } catch (error: any) {
            console.error('Verification error:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'Invalid verification code';
            toast.error(`Verification Failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        if (countdown > 0) return;

        try {
            setLoading(true);

            if (type === 'forgot-password') {
                // Resend OTP cho forgot password
                await authApi.forgotPassword(email);
            } else {
                // Resend OTP cho signup/login
                await authApi.resendOTP(email);
            }

            setCountdown(60);
            toast.success('Code Sent - A new verification code has been sent to your email');

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to resend verification code';
            toast.error(`Failed to resend: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (value: string, index: number) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto verify when all filled
        if (newOtp.every(digit => digit) && value) {
            setTimeout(() => handleVerifyOTP(newOtp.join('')), 100);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

        if (pastedData.length >= 6) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
            setTimeout(() => handleVerifyOTP(newOtp.join('')), 100);
        }
    };

    const handleResend = () => {
        if (countdown === 0) {
            handleResendOTP();
        }
    };

    // Get dynamic content based on type
    const getContent = () => {
        if (title && description) {
            return { title, description };
        }

        switch (type) {
            case 'forgot-password':
                return {
                    title: 'Verify Your Email',
                    description: 'Enter the 6-digit code sent to your email to reset your password'
                };
            case 'signup':
                return {
                    title: 'Verify Your Email',
                    description: 'Complete your registration by entering the verification code'
                };
            case 'login':
                return {
                    title: 'Email Verification Required',
                    description: 'Please verify your email to continue logging in'
                };
            default:
                return {
                    title: 'Verify Your Email',
                    description: 'Enter the 6-digit code sent to your email'
                };
        }
    };

    const content = getContent();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-white/90 rounded-2xl flex items-center justify-center z-10">
                        <div className="flex flex-col items-center">
                            {isVerified ? (
                                // Success state
                                <>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-green-600 font-medium">Verified Successfully!</p>
                                </>
                            ) : (
                                // Loading state
                                <>
                                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                                    <p className="text-sm text-gray-600 font-medium">Verifying...</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
                    <p className="text-gray-600">
                        {content.description}<br />
                        <span className="font-semibold text-gray-900">{email}</span>
                    </p>
                </div>

                {/* OTP Inputs */}
                <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)} className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${loading
                                ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                                : digit
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                            disabled={loading}
                        />
                    ))}
                </div>                {/* Resend */}
                <div className="text-center mb-6">
                    {countdown > 0 ? (
                        <div className="text-sm text-gray-600">
                            <p className="mb-1">Didn't receive the code?</p>
                            <p className="text-gray-500">Resend in {countdown}s</p>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-600">
                            <span className="mr-2">Didn't receive the code?</span>
                            <button
                                onClick={handleResend}
                                className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    'Resend Code'
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleVerifyOTP(otp.join(''))}
                        disabled={loading || otp.some(digit => !digit)}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationModal;
