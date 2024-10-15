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
    passwordRegexOne: boolean;
    passwordRegexTwo: boolean;
    has15chars: boolean;
    has8chars: boolean;
    hasNumber: boolean;
    hasLowercase: boolean;
  };
  getValidationStyle: (validation: boolean) => Object;
  getMutedStyle: (condition: boolean) => Object;
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
    passwordRegexOne: false,
    passwordRegexTwo: false,
    has15chars: false,
    has8chars: false,
    hasNumber: false,
    hasLowercase: false,
  });

  const getValidationStyle = (validation: boolean) => ({
    color: validation ? 'success.fg' : 'danger.fg',
    fontWeight: validation ? '' : 'bold',
  });

  const getMutedStyle = (condition: boolean) =>
    condition ? { color: 'fg.muted', fontWeight: '' } : {};

  useEffect(() => {
    const has8chars = password.length >= 8;
    const has15chars = password.length >= 15;
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    const passwordRegexOne = has8chars && hasNumber && hasLowercase;
    const passwordRegexTwo = has15chars;

    setValidations({
      passwordRegexOne,
      passwordRegexTwo,
      has15chars,
      has8chars,
      hasNumber,
      hasLowercase,
    });
  }, [password]);

  const isValid =
    !!password.trim() &&
    !!confirmPassword.trim() &&
    password === confirmPassword &&
    (validations.passwordRegexOne || validations.passwordRegexTwo);

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
        getValidationStyle,
        getMutedStyle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
