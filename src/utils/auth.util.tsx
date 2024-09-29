import { useEffect, useState } from 'react';
import BlankStateSystemError from '../components/BlankState/BlankStateSystemError';
import { login, checkToken } from '../services/auth.service';

export const handleCheckToken = async (token: string) => {
  try {
    await checkToken(token);
  } catch {
    localStorage.removeItem('access_token');
  }
};

export const usePasswordValidation = () => {
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [age, setAge] = useState<number | null>(0);
  const [gender, setGender] = useState<string | null>('');

  const [username, setUsername] = useState('');
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
    !!firstName?.trim() &&
    !!lastName?.trim() &&
    !!age &&
    !!gender?.trim() &&
    !!username.trim() &&
    !!password.trim() &&
    !!confirmPassword.trim() &&
    password === confirmPassword &&
    (validations.minLength || validations.minLengthWithRequirements);

  return {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    isValid,
    validations,
  };
};

export const handleLoginSubmit = async (
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
      <BlankStateSystemError httpError={error} />;
      return { error: false };
    }
  }
};

// export const handleCreateAccountSubmit = async (
//   username: string,
//   password: string,
//   firstName: string,
//   lastName: string,
//   age: number,
//   gender: string
// ) => {
//   try {
//     (await users.create(
//       username,
//       password,
//       firstName,
//       lastName,
//       age,
//       gender
//     )) as User;
//     navigate('/');
//   } catch (error: any) {
//     if (error.response && error.response.status === 409) {
//       return 'Username already exists.';
//     } else {
//       <BlankStateSystemError httpError={error} />;
//     }
//   }
// };
