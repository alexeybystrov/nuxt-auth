// import { Nitro } from 'nitropack';
import { connect } from 'mongoose';
// eslint-disable-next-line import/named
import { v2 as cloudinary } from 'cloudinary';

export default async (/* _nitroApp: Nitro */) => {
  const {
    mongodbUri,
    cloudinaryCloudName,
    cloudinaryApiKey,
    cloudinaryApiSecret,
  } = useRuntimeConfig();

  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });

  try {
    await connect(mongodbUri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
};
