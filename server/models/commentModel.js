import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    pinId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      userId: String,
      userName: String,
      userImage: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
