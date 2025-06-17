import { useForm } from "react-hook-form";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import LoadingButton from "./LoadingButton";

interface SignupFormProps {
    onSubmit: (data: any) => void;
    loading?: boolean;
}

const SignupForm = ({ onSubmit, loading = false }: SignupFormProps) => {
    const { register, handleSubmit } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 px-8">
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
