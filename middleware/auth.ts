import { verifyToken } from '~/api';

export default defineNuxtRouteMiddleware(async () => {
  const token = localStorage.getItem('token');
  if (!token) return navigateTo('/login');

  try {
    await verifyToken({ token });
  } catch (error) {
    return navigateTo('/login');
  }
});
