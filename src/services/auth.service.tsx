import api from './api.service';

const login = async (username: string, password: string): Promise<string> => {
  const localStorageToken = localStorage.getItem('access_token');

  if (localStorageToken) {
    api.defaults.headers.common['Authorization'] =
      `Bearer ${localStorageToken}`;
    return localStorageToken;
  }

  const response = await api.post<{ access_token: string }>('/auth/login', {
    username,
    password,
  });
  const token = response.data.access_token;
  localStorage.setItem('access_token', token);

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return token;
};

const logout = (): void => {
  localStorage.removeItem('access_token');
  window.location.href = '/login';
};

const checkToken = async (token: string): Promise<void> => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    await api.get('/notes');
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid access_token');
    } else {
      throw error;
    }
  }
};

export { checkToken, login, logout };
