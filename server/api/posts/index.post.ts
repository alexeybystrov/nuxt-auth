import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  try {
    const { title, description } = await readBody(event);
    const newPost = await Post.create({ title, description });

    return newPost;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
