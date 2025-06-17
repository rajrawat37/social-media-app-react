import express from "express";
import {
  createComment,
  getCommentsByPinId,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

// Create a comment for a pin
commentRouter.post("/:id", createComment);

// Get all comments for a pin
commentRouter.get("/display/:id", getCommentsByPinId);

export default commentRouter;
