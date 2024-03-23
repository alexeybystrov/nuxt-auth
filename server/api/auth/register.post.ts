import { genSalt, hash } from 'bcrypt';
import User from '~/server/models/User';
import { sign } from '~/utils/tokens';

const { secret } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const candidate = await User.findOne({ username });
  if (candidate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username already exists',
    });
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  const user = await User.create({ username, password: hashedPassword });

  const token = await sign(user._id, secret);

  return { token };
});
