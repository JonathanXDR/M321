import React, { createContext, useContext } from 'react';
import { checkToken, login } from '../services/auth.service';

interface AuthProviderProps extends React.PropsWithChildren<{}> {}

interface AuthContextData {
  handleCheckToken: (token: string, navigate: any) => Promise<void>;
  handleLoginSubmit: (
    username: string,
    password: string,
    navigate: any
  ) => Promise<{ error: boolean }>;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const handleCheckToken = async (token: string, navigate: any) => {
    try {
      await checkToken(token);
      navigate('/');
    } catch {
      localStorage.removeItem('access_token');
    }
  };

  const handleLoginSubmit = async (
    username: string,
    password: string,
    navigate: any
  ) => {
    try {
      await login(username, password);
      navigate('/');
      return { error: false };
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return { error: true };
      } else {
        return { error: false };
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleCheckToken,
        handleLoginSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
