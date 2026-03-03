import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';

interface AdminProfile {
    id: string;
    email: string;
}

interface AuthContextType {
    admin: AdminProfile | null;
    isAuthenticated: boolean;
    login: (tokens: { accessToken: string, refreshToken: string }, admin: AdminProfile) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [admin, setAdmin] = useState<AdminProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('adminAccessToken');
            if (token) {
                try {
                    const response = await api.get('/me');
                    setAdmin({
                        id: response.data.data._id || response.data.data.id,
                        email: response.data.data.email
                    });
                } catch (error) {
                    console.error('Auth verification failed', error);
                    logout();
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const login = (tokens: { accessToken: string, refreshToken: string }, adminData: AdminProfile) => {
        localStorage.setItem('adminAccessToken', tokens.accessToken);
        localStorage.setItem('adminRefreshToken', tokens.refreshToken);
        setAdmin(adminData);
    };

    const logout = () => {
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
