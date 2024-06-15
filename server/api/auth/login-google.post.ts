import { OAuth2Client } from 'google-auth-library';
import { Types } from 'mongoose';
import { sign } from '~/utils/tokens';

const { googleClientId, secret } = useRuntimeConfig();
const client = new OAuth2Client();

async function verify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: googleClientId,
  });
  const payload = ticket.getPayload();

  return payload;
}

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  const user = await verify(token);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const newToken = await sign(user.sub as unknown as Types.ObjectId, secret);

  return { userId: user.sub, token: newToken };
});
