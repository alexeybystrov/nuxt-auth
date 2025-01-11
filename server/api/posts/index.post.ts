import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  try {
    const { userId, title, description, imageUrl } = await readBody(event);
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
