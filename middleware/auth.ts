import { verifyToken } from '~/api';

export default defineNuxtRouteMiddleware(async () => {
  const cookieToken = useCookie('token');
  if (!cookieToken.value) return navigateTo('/login');

  try {
    await verifyToken({ token: cookieToken.value });
  } catch (error) {
    return navigateTo('/login');
  }
});
