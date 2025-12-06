// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { LoginModel } from '../models/LoginModel';

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
    // Perform login logic, set user in state
    console.log('Logging in user:', data);
    setUser(data);
  };
  // const updatePhoneNumber = (newPhoneNumber: string) => {
  //   setUser((prevUser) => {
  //     if (!prevUser) return prevUser; // Trường hợp `user` chưa có dữ liệu

  //     return {
  //       ...prevUser,
  //       phone_number: newPhoneNumber,
  //     };
  //   });
  // };
  // const updateActivePhoneNumber = () => {
  //   setUser((prevUser) => {
  //     if (!prevUser) return prevUser; // Trường hợp `user` chưa có dữ liệu

  //     return {
  //       ...prevUser,
  //       is_phone: 2,
  //     };
  //   });
  // };
  // const updateActiveAddress = () => {
  //   setUser((prevUser) => {
  //     if (!prevUser) return prevUser; // Trường hợp `user` chưa có dữ liệu

  //     return {
  //       ...prevUser,
  //       is_address: 2,
  //     };
  //   });
  // };
  // const updateActiveFullName = (newFullname: string) => {
  //   setUser((prevUser) => {
  //     if (!prevUser) return prevUser; // Trường hợp `user` chưa có dữ liệu

  //     return {
  //       ...prevUser,
  //       full_name: newFullname,
  //     };
  //   });
  // };


  const logout = async (): Promise<void> => {
    // Perform logout logic, clear user from state
    setUser(null);
  };

  const setLoginInfo = (userInfo: string) => {
    // Set login info logic
    console.log(`Setting login info: ${userInfo}`);
  };

  const updateUser = async (changes: Partial<LoginModel>) => {
    setUser((prevUser) => prevUser ? { ...prevUser, ...changes } : prevUser);
  };

  const restoreSession = async () => {
    // Implement session restoration logic here
    // For now, just set loading to false
    setLoading(false);
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
