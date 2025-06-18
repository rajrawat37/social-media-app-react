import express from "express";
import {
  fetchSearchImages,
  fetchMultipleImages,
} from "../controllers/unsplashController.js";

const unsplashRouter = express.Router();

// GET: Get Searched Images
unsplashRouter.get("/search", fetchSearchImages);

// GET: Get all Images
unsplashRouter.get("/all", fetchMultipleImages);

export default unsplashRouter;
