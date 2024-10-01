import React, { createContext, useContext, useEffect, useState } from 'react';
import BlankStateSystemError from '../components/BlankState/BlankStateSystemError';

interface ValidationProviderProps extends React.PropsWithChildren<{}> {}
interface ValidationContextData {}

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
  return (
    <ValidationContext.Provider value={{}}>
      {children}
    </ValidationContext.Provider>
  );
};
