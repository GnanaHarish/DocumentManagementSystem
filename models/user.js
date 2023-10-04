import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.index({id: 1}, {unique: true});

const User = mongoose.model('User', userSchema);

export default User;
