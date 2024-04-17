import { compare } from 'bcrypt';
import User from '~/server/models/User';
import { sign } from '~/utils/tokens';

const { secret } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const user = await User.findOne({ username });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const token = await sign(user._id, secret);

  return { userId: user._id, token };
});
