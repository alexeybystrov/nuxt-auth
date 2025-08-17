import { Types } from 'mongoose';
import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  const userId = event.context.userId;

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const id = getRouterParam(event, 'id');
  const postId = Types.ObjectId.isValid(id as string)
    ? new Types.ObjectId(id as string)
    : null;

  if (!postId) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invalid post ID format',
    });
  }

  const { title, description, imageUrl, likes } = await readBody(event);
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      description,
      updatedAt: Date.now(),
      ...(imageUrl && { imageUrl }),
      ...(likes && { likes }),
    },
    { new: true },
  );
  if (!updatedPost) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    });
  }

  return updatedPost;
});
