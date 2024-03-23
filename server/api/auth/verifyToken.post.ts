import { verify } from '~/utils/tokens';

const { secret } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  const { id } = await verify(token, secret);

  return id;
});
