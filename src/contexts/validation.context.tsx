import React, { createContext, useContext, useEffect, useState } from 'react';
import BlankStateSystemError from '../components/BlankState/BlankStateSystemError';

interface ValidationProviderProps extends React.PropsWithChildren<{}> {}
interface ValidationContextData {
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
}

const ValidationContext = createContext<ValidationContextData | null>(null);

export const useValidationContext = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error(
      'useValidationContext must be used within an ValidationProvider'
    );
  }
  return context;
};

export const ValidationProvider: React.FC<ValidationProviderProps> = ({
  children,
}) => {
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

    const newValidations = {
      minLength: password.length >= minLength,
      minLengthWithRequirements:
        password.length >= minLengthWithRequirements &&
        hasNumber &&
        hasLowercase,
      hasNumber,
      hasLowercase,
    };

    setValidations(newValidations);
  }, [password]);

  const isValid =
    !!password.trim() &&
    !!confirmPassword.trim() &&
    password === confirmPassword &&
    (validations.minLength || validations.minLengthWithRequirements);

  return (
    <ValidationContext.Provider
      value={{
        password,
        confirmPassword,
        setPassword,
        setConfirmPassword,
        isValid,
        validations,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};
