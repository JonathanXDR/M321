import React, { createContext, useContext, useRef, useState } from 'react';

interface ValidationProviderProps extends React.PropsWithChildren<{}> {}
interface ValidationContextData {
  useInputValidation: (inputRefs: React.RefObject<HTMLInputElement>[]) => {
    handleFormSubmit: (submitCallback: () => Promise<void>) => Promise<void>;
    errors: { [key: string]: boolean };
    hasError: (fieldName: string) => boolean;
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

const useInputValidation = (inputRefs: React.RefObject<HTMLInputElement>[]) => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleFormSubmit = async (submitCallback: () => Promise<void>) => {
    setSubmitAttempted(true);
    let hasError = false;

    inputRefs.forEach((inputRef) => {
      const input = inputRef.current as HTMLInputElement;
      if (input && !input.value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input.name]: true,
        }));
        if (!hasError) {
          hasError = true;
          input.focus();
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input.name]: false,
        }));
      }
    });

    if (!hasError) {
      await submitCallback();
    }
  };

  const hasError = (fieldName: string) => {
    return submitAttempted && errors[fieldName];
  };

  return { handleFormSubmit, errors, hasError };
};

export const ValidationProvider: React.FC<ValidationProviderProps> = ({
  children,
}) => {
  return (
    <ValidationContext.Provider value={{ useInputValidation }}>
      {children}
    </ValidationContext.Provider>
  );
};
