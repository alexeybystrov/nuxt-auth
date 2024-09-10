// eslint-disable-next-line import/named
import { v2 as cloudinary } from 'cloudinary';
import Post from '~/server/models/Post';

export default defineEventHandler(async (event) => {
  try {
    const { title, description, imagePath } = await readBody(event);
    if (!imagePath) {
      const newPost = await Post.create({
        title,
        description,
      });

      return newPost;
    } else {
      const uploadResult = await cloudinary.uploader.upload(imagePath, {
        folder: 'posts',
      });
      const newPost = await Post.create({
        title,
        description,
        imageUrl: uploadResult.secure_url,
        // ...(uploadResult && { imageUrl: uploadResult.secure_url }),
      });

      return newPost;
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
