import { Types } from 'mongoose';
import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
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

  const { title, description, imageUrl } = await readBody(event);
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      description,
      updatedAt: Date.now(),
      ...(imageUrl && { imageUrl }),
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
