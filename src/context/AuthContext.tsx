import React, { createContext, useState, useContext, ReactNode } from 'react';
import { authService } from '../services/authService';
interface User {
    id: string;
    username: string;
    email: string;
    token: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>; // Add this

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(authService.getCurrentUser());

    const login = async (username: string, password: string) => {
        try {
            const userData = await authService.login({ username, password });
            setUser(userData);
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const register = async (username: string, email: string, password: string, role: string) => {
        try {
            await authService.register({ username, email, password, role });
        } catch (error) {
            console.error('Registration failed', error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const forgotPassword = async (email: string) => {
        try {
            await authService.forgotPassword(email);
            console.log('Password reset link sent successfully');
        } catch (error) {
            console.error('Forgot password request failed', error);
            throw error;
        }
    };
    const resetPassword = async (token: string, newPassword: string) => {
        try {
            await authService.resetPassword(token, newPassword);
            console.log('Password reset successfully');
        } catch (error) {
            console.error('Reset password failed', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
