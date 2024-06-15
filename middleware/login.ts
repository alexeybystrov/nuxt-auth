export default defineNuxtRouteMiddleware(() => {
  const cookieToken = useCookie('token');
  if (cookieToken.value) return navigateTo('/');
});
