'use client'
import Image from "next/image"
import { useState } from "react"
import ImageSlider from "./component/Slider";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleView = (view: string) => {
    setIsLogin(view === 'login');
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
          {/* Left Section */}
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

            
            <div className="relative overflow-hidden h-[320px]">
              <div
                className={`transition-transform duration-500 ease-in-out absolute w-full ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
                <form className="space-y-4 px-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Password</p>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded border-gray-300 text-black focus:ring-0" />
                      Remember me
                    </label>
                    <a href="#" className="text-gray-600 hover:underline">Forgot Password?</a>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Log In
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
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Password</p>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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

          {/* Right Section - Image and Text */}
          {/* <div className="w-full md:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Travel destination"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-8 right-8 z-10">
              <div className="bg-white p-4 rounded-lg max-w-xs">
                <div className="flex items-start gap-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-red-500"></div>
                  <div>
                    <h3 className="text-md font-medium">Wander, Explore, Experience.</h3>
                    <p className="text-xs text-gray-600 mt-1">Discover amazing adventures, embrace unforgettable travel memories worldwide.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-20 right-4 z-10 text-white text-right">
              <h4 className="text-xl font-light">Escape the Ordinary,</h4>
              <h4 className="text-xl font-light">Embrace the Journey!</h4>
              <button className="mt-4 px-6 py-2 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-colors">
                Experience the world your way!
              </button>
            </div>
          </div> */}
          <ImageSlider/>
        </div>
      </div>
    </>
  )
}

export default LoginPage