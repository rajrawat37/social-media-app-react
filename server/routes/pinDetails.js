import express from "express";

const pinRouter = express.Router();

// Route: GET /pin-detail/:id

pinRouter.get("/:id", pin);
