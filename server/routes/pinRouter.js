import express from "express";
import {
  savePinsByUserId,
  getSavedPinsByUserId,
} from "../controllers/savedPinController.js";

const pinRouter = express.Router();

// POST: Save a pin
pinRouter.post("/saved/:userId", savePinsByUserId);

// GET: Get all saved pins by user
pinRouter.get("/saved/:userId", getSavedPinsByUserId);

export default pinRouter;
