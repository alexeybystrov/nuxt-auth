import { verifyToken } from '~/api';
import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  try {
    const { title, description, imageUrl } = await readBody(event);
    const token = getCookie(event, 'token');
    if (!token) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    const userId = await verifyToken({ token });
    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
      });
    }

    const newPost = await Post.create({
      userId,
      title,
      description,
      ...(imageUrl && { imageUrl }),
    });

    return newPost;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
