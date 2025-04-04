import { useApiFetch } from '~/composables/useApiFetch';
import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { userId, token } = await readBody(event);
  if (!userId || !token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid params',
    });
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const isTokenValid = await useApiFetch('/api/auth/verifyToken', {
    method: 'POST',
    body: { token },
  });
  if (!isTokenValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  return { user };
});
