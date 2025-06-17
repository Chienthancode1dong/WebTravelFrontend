'use client'
import { useState, useRef, useEffect } from 'react';
import authApi from '@/lib/auth-api';

interface EmailVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback when verification successful
    email: string;
}

const EmailVerificationModal = ({
    isOpen,
    onClose,
    onSuccess,
    email,
}: EmailVerificationModalProps) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [countdown, setCountdown] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setOtp(Array(6).fill(''));
            setCountdown(60);
            setError(null);
            setLoading(false);
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
            setError(null);

            await authApi.verifyEmail(email, otpCode);

            // Success - call parent callback
            onSuccess();
            onClose();

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Invalid verification code';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        if (countdown > 0) return;

        try {
            setLoading(true);
            setError(null);

            await authApi.resendOTP(email);
            setCountdown(60);

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to resend verification code';
            setError(errorMessage);
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
    }; const handlePaste = (e: React.ClipboardEvent) => {
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                    <p className="text-gray-600">
                        We sent a 6-digit code to<br />
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
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${digit ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                            disabled={loading}
                        />
                    ))}
                </div>



                {/* Resend */}
                <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                    {countdown > 0 ? (
                        <p className="text-sm text-gray-500">Resend in {countdown}s</p>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            disabled={loading}
                        >
                            Resend Code
                        </button>
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
