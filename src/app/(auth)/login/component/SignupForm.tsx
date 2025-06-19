'use client'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import authApi from '@/lib/auth-api';
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import LoadingButton from "./LoadingButton";

interface ToastHook {
    showSuccess: (title: string, message?: string) => void;
    showError: (title: string, message?: string) => void;
}

interface SignupFormProps {
    onRegistrationSuccess: (email: string) => void;
    toast: ToastHook;
}

const SignupForm = ({ onRegistrationSuccess, toast }: SignupFormProps) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSignupSubmit = async (data: any) => {
        try {
            setLoading(true);

            // Call signup API
            const response = await authApi.register(data.fullName, data.email, data.password);

            // Show verification modal after successful registration
            onRegistrationSuccess(data.email);
            toast.showSuccess('Registration Successful', 'Please check your email for verification code');

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            toast.showError('Registration Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSignupSubmit)} className="space-y-3 px-8">
            <InputField
                label="Full Name"
                type="text"
                register={(options: any) => register("fullName", options)}
                required={true}
            />

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

            <div className="flex items-center text-sm">
                <label className="flex items-center text-xs">
                    <input
                        {...register("agreeToTerms", { required: true })}
                        type="checkbox"
                        className="mr-2 rounded border-gray-300 text-black focus:ring-0"
                    />
                    I agree to the Terms and Privacy Policy
                </label>
            </div>

            <LoadingButton
                type="submit"
                loading={loading}
                loadingText="Creating Account..."
            >
                Create Account
            </LoadingButton>
        </form>
    );
};

export default SignupForm;
