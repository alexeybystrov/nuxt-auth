import { loginUser, registerUser } from '~/api';

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await loginUser({ username, password });
    isAuthenticated.value = true;
  };

  const logout = () => {
    isAuthenticated.value = false;
  };

  const register = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await registerUser({ username, password });
    isAuthenticated.value = true;
  };

  return { isAuthenticated, login, logout, register };
});
