export default defineEventHandler((event) => {
  const userId = getCookie(event, 'userId');

  if (!userId) return;

  event.context.userId = userId;
});
