import mongoose from "mongoose";

//Defines the structure, types, and validation rules for documents in a MongoDB collection.
//It serves as a blueprint for how documents should be structured.
const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const SaveSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const pinSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    about: { type: String },
    destination: { type: String },
    category: { type: String },
    image: {
      public_id: String,
      url: String,
    },
    userId: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    save: [SaveSchema],
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

//Models in mongoose are similar to classes in OOPS
//Models defines the schema (structure) and provides methods for database operations.
const pinModel = mongoose.model("pin", pinSchema);

//Mongoose models provide methods for interacting with the MongoDB collection, such as .save(), .find(), .findById(), etc

export default pinModel;
