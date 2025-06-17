'use client'
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
const AuthForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const url = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const { register: registerLogin, handleSubmit: handleSubmitLogin } = useForm();
    const { register: registerSignup, handleSubmit: handleSubmitSignup } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleView = (view: string) => {
        setIsLogin(view === 'login');
    };
    const onLoginSubmit = async (value: any) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post(`${url}/api/v1/auth/login`, {
                username: value.email,
                password: value.password
            },
            {
                withCredentials: true
            });
            if (response.status === 201) {
                // Handle successful login
                console.log('Login successful:', response.data);
                router.push('/');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className="w-full md:w-1/2 p-8 space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-light tracking-wider">Travel Vougaix</h1>
                <p className="text-sm text-gray-600">Explore More. Experience Life.</p>
            </div>

            <div className="flex gap-4 justify-center px-8 mb-5">
                <button
                    className={`px-6 py-2 border border-gray-300 rounded-md flex-1 transition-all duration-300 ${!isLogin ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => toggleView('signup')}
                >
                    Sign Up
                </button>
                <button
                    className={`px-6 py-2 rounded-md flex-1 transition-all duration-300 ${isLogin ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
                    onClick={() => toggleView('login')}
                >
                    Log In
                </button>
            </div>

            <div className="">
                <div className="text-2xl font-light ml-8">{isLogin ? 'Journey Begins' : 'Join the Adventure'}</div>
                <div className="px-8 text-sm text-gray-500">
                    {isLogin ? 'Log In with Open account' : 'Create your travel account'}
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-2 px-8">
                <button
                    className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                    title="Đăng nhập với Google"
                    aria-label="Đăng nhập với Google"
                    type="button"
                >
                    <Image
                        src="/search.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                </button>
                <button
                    className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                    title="Đăng nhập với Facebook"
                    aria-label="Đăng nhập với Facebook"
                    type="button"
                >
                    <Image
                        src="/facebook.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                </button>
                <button
                    className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                    title="Đăng nhập với X"
                    aria-label="Đăng nhập với X"
                    type="button"
                >
                    <Image
                        src="/twitter.png"
                        alt="X"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                </button>
            </div>

            <div className="flex items-center px-8">
                <div className="flex-1 h-px bg-gray-200"></div>
                <div className="px-4 text-sm text-gray-500">or</div>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>


            <div className="relative overflow-hidden h-[320px]">
                <div
                    className={`transition-transform duration-500 ease-in-out absolute w-full ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
                    <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4 px-8">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <input
                                {...registerLogin("email", { required: true })}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Password</p>
                            <div className="relative">
                                <input
                                    {...registerLogin("password", { required: true })}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72 1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-black focus:ring-0" />
                                Remember me
                            </label>
                            <a href="#" className="text-gray-600 hover:underline">Forgot Password?</a>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : 'Log In'}
                        </button>
                    </form>
                </div>

                <div
                    className={`transition-transform duration-500 ease-in-out absolute w-full ${!isLogin ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <form className="space-y-3 px-8">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Full Name</p>
                            <input
                                {...registerSignup("fullname", { required: true })}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <input
                                {...registerSignup("email", { required: true })}
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Password</p>
                            <div className="relative">
                                <input
                                    {...registerSignup("password", { required: true })}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72 1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Re-enter password</p>
                            <div className="relative">
                                <input
                                    {...registerSignup("repassword", { required: true })}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72 1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center text-sm">
                            <label className="flex items-center text-xs">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-black focus:ring-0" />
                                I agree to the Terms and Privacy Policy
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;