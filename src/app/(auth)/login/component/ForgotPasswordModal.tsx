'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import authApi from '@/lib/auth-api';
import PasswordInput from './PasswordInput';
import LoadingButton from './LoadingButton';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    token?: string; // Token từ verification step
}

interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}

const ForgotPasswordModal = ({
    isOpen,
    onClose,
    email,
    token
}: ForgotPasswordModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ResetPasswordForm>();
    const [showRequirements, setShowRequirements] = useState(false); 
    const onResetPassword = async (data: { password: string; confirmPassword: string }) => {
        try {
            setLoading(true);
            setError(null);

            if (token) {
                await authApi.resetPassword(token, data.password);
            } else {
                toast.warning('')
                await authApi.resetPassword(email, data.password);
            }

            onClose();
            toast.success('Password Reset Successful - Please login with your new password');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to reset password';
            setError(errorMessage);
            toast.error(`Password Reset Failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    // Password strength validation
    const passwordRequirements = [
        { test: /.{8,}/, text: 'At least 8 characters' },
        { test: /[A-Z]/, text: 'One uppercase letter' },
        { test: /[a-z]/, text: 'One lowercase letter' },
        { test: /\d/, text: 'One number' },
        { test: /[!@#$%^&*(),.?":{}|<>]/, text: 'One special character' }
    ];

    const getPasswordScore = (pwd: string) => {
        if (!pwd) return 0;
        return passwordRequirements.filter(req => req.test.test(pwd)).length;
    };

    const passwordScore = getPasswordScore(password || '');
    const isPasswordValid = passwordScore >= 3;
    const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

    const onSubmit = (data: ResetPasswordForm) => {
        if (data.password !== data.confirmPassword) {
            return;
        }
        onResetPassword(data);
    };

    const handleClose = () => {
        reset();
        setShowRequirements(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reset Password</h2>
                    <p className="text-gray-600">
                        Create a new password for
                    </p>
                    <p className="text-gray-900 font-medium">{email}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Password Input */}
                    <div>
                        <PasswordInput
                            label="New Password"
                            register={(options: any) => register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                },
                                validate: (value: string) => {
                                    const score = getPasswordScore(value);
                                    if (score < 4) {
                                        return "Password must meet security requirements";
                                    }
                                    return true;
                                }
                            })}
                            required={true}
                        />

                        {/* Password strength indicator */}
                        {password && (
                            <div className="mt-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${passwordScore <= 2 ? 'bg-red-500' :
                                                passwordScore === 3 ? 'bg-yellow-500' :
                                                    passwordScore === 4 ? 'bg-blue-500' :
                                                        'bg-green-500'
                                                }`}
                                            style={{ width: `${(passwordScore / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className={`text-xs font-medium ${passwordScore <= 2 ? 'text-red-500' :
                                        passwordScore === 3 ? 'text-yellow-500' :
                                            passwordScore === 4 ? 'text-blue-500' :
                                                'text-green-500'
                                        }`}>
                                        {passwordScore <= 2 ? 'Weak' :
                                            passwordScore === 3 ? 'Fair' :
                                                passwordScore === 4 ? 'Good' :
                                                    'Strong'}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowRequirements(!showRequirements)}
                                    className="text-xs text-blue-600 hover:text-blue-700 underline"
                                >
                                    {showRequirements ? 'Hide' : 'Show'} password requirements
                                </button>

                                {showRequirements && (
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-600 mb-2">Password must contain:</p>
                                        <ul className="space-y-1">
                                            {passwordRequirements.map((req, index) => (
                                                <li key={index} className="flex items-center gap-2 text-xs">
                                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.test.test(password || '') ? 'bg-green-100' : 'bg-gray-200'
                                                        }`}>
                                                        {req.test.test(password || '') ? (
                                                            <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-2.5 h-2.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className={req.test.test(password || '') ? 'text-green-600' : 'text-gray-500'}>
                                                        {req.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <PasswordInput
                            label="Confirm New Password"
                            register={(options: any) => register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value: string) => {
                                    if (value !== password) {
                                        return "Passwords do not match";
                                    }
                                    return true;
                                }
                            })}
                            required={true}
                        />

                        {/* Password match indicator */}
                        {confirmPassword && (
                            <div className="mt-2 flex items-center gap-2">
                                {doPasswordsMatch ? (
                                    <>
                                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-green-600 text-sm">Passwords match</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-red-500 text-sm">Passwords do not match</span>
                                    </>
                                )}
                            </div>
                        )}

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Global Error */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            loadingText="Updating Password..."
                            disabled={!isPasswordValid || !doPasswordsMatch}
                            className={`${(!isPasswordValid || !doPasswordsMatch)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                                : ''
                                }`}
                        >
                            Update Password
                        </LoadingButton>
                    </div>
                </form>

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-blue-700 text-xs">
                            For your security, you'll be logged out from all devices after changing your password.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
