// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { LoginModel } from '../models/LoginModel';

type AuthContextType = {
  user: LoginModel | null;
  login: (data: LoginModel) => void;
  logout: () => void;
  setLoginInfo: (userInfo: string) => void; // Define setLoginInfo function
  updateActivePhoneNumber: () => void;
  updatePhoneNumber: (newPhoneNumber: string) => void;
  updateActiveAddress: () => void;
  updateActiveFullName: (newFullname: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginModel | null>(null);

  const login = (data: LoginModel) => {
    // Perform login logic, set user in state
    setUser(data);
  };
  const updatePhoneNumber = (newPhoneNumber: string) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser; // Trường hợp `user` chưa có dữ liệu

      return {
        ...prevUser,
        phone_number: newPhoneNumber,
      };
    });
  };
  const updateActivePhoneNumber = () => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser; // Trường hợp `user` chưa có dữ liệu

      return {
        ...prevUser,
        is_phone: 2,
      };
    });
  };
  const updateActiveAddress = () => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser; // Trường hợp `user` chưa có dữ liệu

      return {
        ...prevUser,
        is_address: 2,
      };
    });
  };
  const updateActiveFullName = (newFullname: string) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser; // Trường hợp `user` chưa có dữ liệu

      return {
        ...prevUser,
        full_name: newFullname,
      };
    });
  };


  const logout = () => {
    // Perform logout logic, clear user from state
    setUser(null);
  };

  const setLoginInfo = (userInfo: string) => {
    // Set login info logic
    console.log(`Setting login info: ${userInfo}`);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setLoginInfo, updateActivePhoneNumber,updatePhoneNumber, updateActiveAddress, updateActiveFullName }}>
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
