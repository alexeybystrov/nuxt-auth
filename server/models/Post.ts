import { model, Schema } from 'mongoose';

const postSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = model('Post', postSchema);

export default Post;
