import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Google ID (sub)
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String, // URL to the profile image
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
