import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const user = await User.findOne({ username, password });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  return 'Login successful';
});
