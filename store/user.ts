import { loginUser, registerUser } from '~/api';

export const useUserStore = defineStore('user', () => {
  const cookieUserId = useCookie('userId');
  const cookieToken = useCookie('token');

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { userId, token } = await loginUser({ username, password });
    cookieUserId.value = userId;
    cookieToken.value = token;
  };

  const logout = () => {
    cookieUserId.value = null;
    cookieToken.value = null;
  };

  const register = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { userId, token } = await registerUser({ username, password });
    cookieUserId.value = userId;
    cookieToken.value = token;
  };

  return { login, logout, register };
});
