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

  const post = await Post.findById(postId);
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    });
  }

  return post;
});
