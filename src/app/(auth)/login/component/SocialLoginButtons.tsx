import Image from "next/image";
import { useEffect, useState } from 'react'
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { googleAuthApi } from '@/lib/google-auth-api';
import { loginWithFacebook, loginWithTwitter } from '@/lib/social-auth-api';
import { toast } from 'react-toastify'
const SocialLoginButtons = () => {
    const [loading, setLoading] = useState<string | null>(null);
    const [fedCMSupported, setFedCMSupported] = useState<boolean | null>(null);

    // Reset loading state when component mounts/re-mounts
    useEffect(() => {
        setLoading(null);
    }, []);

    // Check FedCM support
    useEffect(() => {
        const checkFedCMSupport = () => {
            // Check if browser supports FedCM
            if ('IdentityCredential' in window) {
                setFedCMSupported(true);
            } else {
                setFedCMSupported(false);
            }
        };

        checkFedCMSupport();
    }, []);

    // Google One Tap Login Hook - FedCM compliant
    useGoogleOneTapLogin({
        onSuccess: async (credentialResponse) => {
            try {

                if (!credentialResponse.credential) {
                    throw new Error('No credential received from Google One Tap');
                } const result = await googleAuthApi.loginWithGoogle(credentialResponse.credential);                if (result.success && result.data?.data?.user) {
                    const user = result.data.data.user;
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('email', user.name);
                    localStorage.setItem('role', user.role || 'USER');

                    toast.success('Login successful - Welcome back!');
                    window.location.href = '/';
                } else {
                    throw new Error(result.message || 'Google One Tap login failed');
                }
            } catch (error: any) {
                console.error('Google One Tap login error:', error);
                toast.error(`Login failed: ${error.message}`);
            }
        }, onError: () => {
            console.log('Google One Tap failed');
            if (fedCMSupported === false) {
                console.log('Likely due to browser not supporting FedCM');
                console.log('Click Google button for redirect login');
            } else {
                console.log('Redirect login still available as fallback');
            }
        },

        // FedCM configuration - use FedCM if supported, otherwise graceful fallback
        use_fedcm_for_prompt: fedCMSupported !== false,
        auto_select: false,
        cancel_on_tap_outside: true,
    });

    // Google Popup Login Hook - Get real ID Token using auth code
    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                console.log('Google popup success');                
                const result = await googleAuthApi.loginWithGoogle(codeResponse.code);                if (result.success && result.data?.data?.user) {
                    const user = result.data.data.user;
                    // Save user data to localStorage
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('email', user.name); 
                    localStorage.setItem('role', user.role || 'USER');

                    console.log('Google popup login successful');
                    toast.success('Login successful - Welcome back!');
                    window.location.href = '/';
                } else {
                    throw new Error(result.message || 'Google popup login failed');
                }
            } catch (error: any) {
                console.error('Google popup login error:', error);
                toast.error(`Login failed: ${error.message}`);
            } finally {
                setLoading(null);
            }
        },
        onError: (error) => {
            console.error('Google popup login error:', error);
            toast.error('Login failed');
            setLoading(null);
        },
        flow: 'auth-code',
    });

    // Handle Google button click
    const handleGoogleLogin = () => {
        setLoading('google');
        googleLogin();
    };

    // Handle Facebook login
    const handleFacebookLogin = async () => {
        try {
            setLoading('facebook');
            const result = await loginWithFacebook();            if (result.success && result.user) {
                localStorage.setItem('userId', result.user.id);
                localStorage.setItem('email', result.user.name || result.user.email);
                localStorage.setItem('role', result.user.role || 'USER');
                console.log('Facebook login successful');
                toast.success('Login successful - Welcome back!');
                window.location.href = '/';
            } else {
                throw new Error(result.message || 'Facebook login failed');
            }
        } catch (error: any) {
            console.error('Facebook login error:', error);
            toast.error(`Login failed: ${error.message}`);
        } finally {
            setLoading(null);
        }
    };

    // Handle Twitter/X login
    const handleTwitterLogin = async () => {
        try {
            setLoading('twitter');
            const result = await loginWithTwitter();            if (result.success && result.user) {
                localStorage.setItem('userId', result.user.id);
                localStorage.setItem('email', result.user.name || result.user.email);
                localStorage.setItem('role', result.user.role || 'USER');
                console.log('Twitter login successful');
                toast.success('Login successful - Welcome back!');
                window.location.href = '/';
            } else {
                throw new Error(result.message || 'Twitter login failed');
            }
        } catch (error: any) {
            console.error('Twitter login error:', error);
            toast.error(`Login failed: ${error.message}`);
        } finally {
            setLoading(null);
        }
    };

    // Initialize and log FedCM status
    useEffect(() => {
        // Log FedCM status for debugging
        if (fedCMSupported !== null) {
            console.log(`FedCM Status: ${fedCMSupported ? 'Supported' : 'Not Supported'}`);
            console.log(`One Tap Mode: ${fedCMSupported ? 'FedCM Enabled' : 'Legacy Mode'}`);
        }
    }, [fedCMSupported]);

    return (
        <>
            <div className="flex items-center justify-center gap-3 mb-2 px-8">
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading === 'google'}
                    className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                    {loading === 'google' ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    ) : (
                        <Image
                            src="/search.png"
                            alt="Google"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
                    )}
                </button>
                <button
                    onClick={handleFacebookLogin}
                    disabled={loading === 'facebook'}
                    className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                    {loading === 'facebook' ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    ) : (
                        <Image
                            src="/facebook.png"
                            alt="Facebook"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
                    )}
                </button>

                <button
                    onClick={handleTwitterLogin}
                    disabled={loading === 'twitter'}
                    className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                    {loading === 'twitter' ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    ) : (
                        <Image
                            src="/twitter.png"
                            alt="X"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
                    )}
                </button>
            </div>

            <div className="flex items-center px-8">
                <div className="flex-1 h-px bg-gray-200"></div>
                <div className="px-4 text-sm text-gray-500">or</div>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>
        </>
    );
};

export default SocialLoginButtons;
