import BlankStateSystemError from '../components/BlankState/BlankStateSystemError';
import { login, checkToken } from '../services/auth.service';

export const handleCheckToken = async (token: string, navigate: any) => {
  try {
    await checkToken(token);
    navigate('/');
  } catch {
    localStorage.removeItem('access_token');
  }
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
