import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  {
    toJSON: {
      transform(_doc, ret, _options) {
        delete ret.password;
        return ret;
      },
    },
  },
);

const User = model('User', userSchema);

export default User;
