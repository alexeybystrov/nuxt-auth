import { verify } from '~/utils/tokens';

const { secret } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);

  try {
    const { id } = await verify(token, secret);

    return id;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }
});
