import Post from '~/server/models/Post';

export default defineEventHandler(async () => {
  try {
    const posts = await Post.find();

    return posts;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
