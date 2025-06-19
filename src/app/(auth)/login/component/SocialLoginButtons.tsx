import Image from "next/image";
import { useEffect, useState } from 'react'
import { loadFacebookSDK } from '@/app/utils/facebooksdk';
import authApi from '@/lib/auth-api';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const SocialLoginButtons = () => {
const router = useRouter();
const [error, setError] = useState('')
const handleFacebookLogin = async () => {
    await loadFacebookSDK();
    window.FB.login((response: any) => {
    if (response.authResponse) {
      const access_token = response.authResponse.accessToken;
      console.log('Token:', access_token);
      handleFacebookSignIn(access_token)
        
    } else {
      console.warn('Login failed');
    }
  }, { scope: 'email,public_profile' });

}
const handleFacebookSignIn = async (access_token: string) => {
  try {
    const res = await authApi.FacebookSignIn({ access_token });
    console.log('Facebook Sign In Response:', res);
    if (res.success) {
        router.push('/')
        toast.success('Login successful!')               
    } else {
        setError(res.data.message || 'Login failed')
      }
    
  } catch (error) {
    console.error('Login error:', error);
  }
};

useEffect(() => {   
    loadFacebookSDK();     
}, []);

    return (
        <>
            <div className="flex items-center justify-center gap-3 mb-2 px-8">
                <button className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                    <Image
                        src="/search.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                </button>
                <button className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                    <Image
                        src="/facebook.png"
                        onClick={handleFacebookLogin}
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                </button>
                <button className="p-2 bg-white rounded-full border border-gray-300 w-16 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
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
        </>
    );
};

export default SocialLoginButtons;
