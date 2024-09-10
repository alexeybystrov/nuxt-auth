import { Types } from 'mongoose';
// eslint-disable-next-line import/named
import { v2 as cloudinary } from 'cloudinary';
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

  const { title, description, imagePath } = await readBody(event);
  if (!imagePath) {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, description, updatedAt: Date.now() },
      { new: true },
    );
    if (!updatedPost) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found',
      });
    }

    return updatedPost;
  } else {
    const uploadResult = await cloudinary.uploader.upload(imagePath, {
      folder: 'posts',
    });
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        updatedAt: Date.now(),
        imageUrl: uploadResult.secure_url,
        // ...(uploadResult && { imageUrl: uploadResult.secure_url }),
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
  }
});
