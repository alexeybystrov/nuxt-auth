// eslint-disable-next-line import/named
import { v2 as cloudinary } from 'cloudinary';

export default defineEventHandler(async (event) => {
  try {
    const { imagePath } = await readBody(event);
    const { secure_url: imageUrl } = await cloudinary.uploader.upload(
      imagePath,
      {
        folder: 'posts',
      },
    );

    return imageUrl;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
