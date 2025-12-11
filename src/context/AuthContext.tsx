// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginModel } from '../models/LoginModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

// type AuthContextType = {
//   user: LoginModel | null;
//   login: (data: LoginModel) => void;
//   logout: () => void;
//   setLoginInfo: (userInfo: string) => void; // Define setLoginInfo function
//   updateActivePhoneNumber: () => void;
//   updatePhoneNumber: (newPhoneNumber: string) => void;
//   updateActiveAddress: () => void;
//   updateActiveFullName: (newFullname: string) => void;
// };

type AuthContextType = {
  user: LoginModel | null;
  loading: boolean;
  login: (data: LoginModel) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (changes: Partial<LoginModel>) => Promise<void>;
  restoreSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (data: LoginModel): Promise<void> => {
    console.log('Logging in user:', data);
    try {
      setUser(data);
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save login info", error);
    }
  };

  // 🔴 Logout
  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("userInfo");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  // 🟠 Update user info (name, avatar, phone…)
  const updateUser = async (changes: Partial<LoginModel>) => {
    if (!user) return;

    const updated = { ...user, ...changes };
    setUser(updated);
    await AsyncStorage.setItem("userInfo", JSON.stringify(updated));
  };

  useEffect(() => {
    restoreSession();
  }, []);

  // 🟢 Restore session khi mở app
  const restoreSession = async () => {
    try {
      const stored = await AsyncStorage.getItem("userInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (err) {
      console.error("Failed to restore session:", err);
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <AuthContext.Provider value={{ user, login, logout, setLoginInfo, updateActivePhoneNumber, updatePhoneNumber, updateActiveAddress, updateActiveFullName }}>
  //     {children}
  //   </AuthContext.Provider>
  // );
  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updateUser, restoreSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
