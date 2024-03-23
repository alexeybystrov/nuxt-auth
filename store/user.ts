import { loginUser, registerUser } from '~/api';

export const useUserStore = defineStore('user', () => {
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { token } = await loginUser({ username, password });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  const register = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { token } = await registerUser({ username, password });
    localStorage.setItem('token', token);
  };

  return { login, logout, register };
});
