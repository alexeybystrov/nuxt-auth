import User from '~/server/models/User';

export default defineEventHandler(async (_event) => {
  const users = await User.find();

  return {
    users,
  };
});
