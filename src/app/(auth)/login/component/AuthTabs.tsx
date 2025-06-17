interface AuthTabsProps {
    isLogin: boolean;
    onToggle: (view: string) => void;
}

const AuthTabs = ({ isLogin, onToggle }: AuthTabsProps) => {
    return (
        <div className="flex gap-4 justify-center px-8 mb-5">
            <button
                className={`px-6 py-2 border border-gray-300 rounded-md flex-1 transition-all duration-300 ${!isLogin ? 'bg-black text-white' : 'hover:bg-gray-100'
                    }`}
                onClick={() => onToggle('signup')}
            >
                Sign Up
            </button>
            <button
                className={`px-6 py-2 rounded-md flex-1 transition-all duration-300 ${isLogin ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                onClick={() => onToggle('login')}
            >
                Log In
            </button>
        </div>
    );
};

export default AuthTabs;
