import { useState, useEffect } from 'react';

interface AuthUser {
    id: string;
    name: string; // Will actually store name from response
    role: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = () => {
            const userId = localStorage.getItem('userId');
            const name = localStorage.getItem('name');
            const role = localStorage.getItem('role');

            if (userId && name) {
                setUser({ id: userId, name, role: role || 'user' });
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        checkAuth();

        // Listen for localStorage changes (multi-tab sync)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return { user, isAuthenticated };
};

export default useAuth;
