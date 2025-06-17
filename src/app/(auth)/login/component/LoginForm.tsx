import { useForm } from "react-hook-form";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import LoadingButton from "./LoadingButton";

interface LoginFormProps {
    onSubmit: (data: any) => void;
    loading: boolean;
    error: string | null;
    onForgotPassword?: (email: string) => void;
    showWarning?: (title: string, message?: string) => void;
}

const LoginForm = ({ onSubmit, loading, error, onForgotPassword, showWarning }: LoginFormProps) => {
    const { register, handleSubmit, getValues } = useForm();

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        const email = getValues('email');
        if (email && onForgotPassword) {
            onForgotPassword(email);
        } else {
            if (showWarning) {
                showWarning('Email Required', 'Please enter your email address first');
            } else {
                alert('Please enter your email address first');
            }
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-8">
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
                </label>
                <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="text-gray-600 hover:underline"
                >
                    Forgot Password?
                </a>
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
