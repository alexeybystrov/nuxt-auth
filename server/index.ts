// import { Nitro } from 'nitropack';
import { connect } from 'mongoose';

export default async (/* _nitroApp: Nitro */) => {
  const config = useRuntimeConfig();

  try {
    await connect(config.mongodbUri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
};
