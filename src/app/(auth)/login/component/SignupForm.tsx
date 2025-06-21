'use client'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import authApi from '@/lib/auth-api';
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import LoadingButton from "./LoadingButton";

interface SignupFormProps {
    onRegistrationSuccess: (email: string) => void;
}

const SignupForm = ({ onRegistrationSuccess }: SignupFormProps) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm(); const onSignupSubmit = async (data: any) => {
        try {
            setLoading(true);
            const response = await authApi.register(data.fullName, data.email, data.password);
            if (!response) {
                throw new Error(response?.message || 'Registration failed');
            }
            reset();
            onRegistrationSuccess(data.email);
            toast.success('Registration Successful - Please check your email for verification code');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
            toast.error(`Registration Failed: ${errorMessage}`);
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
