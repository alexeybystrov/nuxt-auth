// import { Nitro } from 'nitropack';
import { connect } from 'mongoose';
// eslint-disable-next-line import/named
import { v2 as cloudinary } from 'cloudinary';

export default async (/* _nitroApp: Nitro */) => {
  const config = useRuntimeConfig();

  // Get MongoDB URI from runtime config or fallback to process.env
  const mongodbUri = config.mongodbUri || process.env.MONGODB_URI;
  const cloudinaryCloudName =
    config.cloudinaryCloudName || process.env.CLOUDINARY_CLOUD_NAME;
  const cloudinaryApiKey =
    config.cloudinaryApiKey || process.env.CLOUDINARY_API_KEY;
  const cloudinaryApiSecret =
    config.cloudinaryApiSecret || process.env.CLOUDINARY_API_SECRET;

  // Validate MongoDB URI
  if (
    !mongodbUri ||
    typeof mongodbUri !== 'string' ||
    mongodbUri.trim() === ''
  ) {
    console.error(
      'ERROR: MONGODB_URI environment variable is missing or empty',
    );
    console.error('Please ensure MONGODB_URI is set in your .env file');
    console.error(
      'Runtime config mongodbUri:',
      config.mongodbUri ? 'SET' : 'NOT SET',
    );
    console.error(
      'process.env.MONGODB_URI:',
      process.env.MONGODB_URI ? 'SET' : 'NOT SET',
    );
    return;
  }

  if (
    !mongodbUri.startsWith('mongodb://') &&
    !mongodbUri.startsWith('mongodb+srv://')
  ) {
    console.error(
      'ERROR: MONGODB_URI must start with "mongodb://" or "mongodb+srv://"',
    );
    console.error(`Current value: ${mongodbUri.substring(0, 20)}...`);
    return;
  }

  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });

  try {
    await connect(mongodbUri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Failed to connect to MongoDB:', e);
  }
};
