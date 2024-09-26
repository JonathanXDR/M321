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
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 404)
    ) {
      return { error: true };
    } else {
      console.error('Login error:', error);
      return { error: false };
    }
  }
};
