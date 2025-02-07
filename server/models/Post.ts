import { model, Schema } from 'mongoose';

const postSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    validate: {
      validator: function (value: unknown) {
        return value === null || Number.isInteger(value);
      },
      message: 'Rating must be an integer between 0 and 5.',
    },
  },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = model('Post', postSchema);

export default Post;
