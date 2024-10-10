import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, checkToken } from '../services/auth.service';

interface AuthProviderProps extends React.PropsWithChildren<{}> {}
interface AuthContextData {
  handleCheckToken: (token: string, navigate: any) => Promise<void>;
  password: string;
  confirmPassword: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  isValid: boolean;
  validations: {
    minLength: boolean;
    minLengthWithRequirements: boolean;
    hasNumber: boolean;
    hasLowercase: boolean;
  };
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validations, setValidations] = useState({
    minLength: false,
    minLengthWithRequirements: false,
    hasNumber: false,
    hasLowercase: false,
  });

  useEffect(() => {
    const minLength = 15;
    const minLengthWithRequirements = 8;
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    setValidations({
      minLength: password.length >= minLength,
      minLengthWithRequirements:
        password.length >= minLengthWithRequirements &&
        hasNumber &&
        hasLowercase,
      hasNumber,
      hasLowercase,
    });
  }, [password]);

  const isValid =
    !!password.trim() &&
    !!confirmPassword.trim() &&
    password === confirmPassword &&
    (validations.minLength || validations.minLengthWithRequirements);

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
        password,
        confirmPassword,
        setPassword,
        setConfirmPassword,
        isValid,
        validations,
        handleLoginSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
