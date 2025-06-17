import Image from "next/image";

const SocialLoginButtons = () => {
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
