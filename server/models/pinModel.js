import mongoose from "mongoose";

const savedPinsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Each user has one document
  },
  savedPins: {
    type: [String], // Array of pinId strings
    default: [],
  },
});

//Models in mongoose are similar to classes in OOPS
//Models defines the schema (structure) and provides methods for database operations.
const SavedPin = mongoose.model("SavedPin", savedPinsSchema);

//Mongoose models provide methods for interacting with the MongoDB collection, such as .save(), .find(), .findById(), etc

export default SavedPin;

// Storing All Pins for each User in an array

// [
//   {
//     _id: "664b23fce21f8b0012a2f9a3",  // MongoDB auto-generated
//     userId: "user123",
//     savedPins: ["pin1", "pin2", "pin3"]
//   },
//   {
//     _id: "664b2430e21f8b0012a2f9a4",
//     userId: "user456",
//     savedPins: ["pin3", "pin4"]
//   },
//   {
//     _id: "664b245ce21f8b0012a2f9a5",
//     userId: "user789",
//     savedPins: []
//   }
// ]
