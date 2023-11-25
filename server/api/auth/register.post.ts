import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const isUserExists = await User.findOne({ username });
  if (isUserExists) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username already exists',
    });
  }

  const user = await User.create({ username, password });

  return user;
});
