import React, { createContext, useContext, useState, useEffect } from 'react';
import UserService from '../services/userService';

interface User {
    username: string;
    email: string;
    role: string;
}

interface UpdateUserData {
    username?: string;
    password?: string; // Allow password updates, but don't store it in the user state
}

interface UserContextType {
    user: User | null;
    updateUser: (updatedData: UpdateUserData) => Promise<void>;
    deleteUser: () => Promise<void>;

}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Fetch user data when the app loads
        const fetchUser = async () => {
            try {
                const userData = await UserService.getUser();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUser();
    }, []);

    const updateUser = async (updatedData: UpdateUserData) => {
        try {
            await UserService.updateUser(updatedData);

            // Update only allowed fields (ignore password)
            setUser((prevUser) => prevUser ? { ...prevUser, ...updatedData } : null);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };



    const deleteUser = async () => {
        try {
            await UserService.deleteUser();
            setUser(null); // Remove user from state
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };


    return (
        <UserContext.Provider value={{ user, updateUser , deleteUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};


