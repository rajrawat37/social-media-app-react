import express from "express";
import { authGoogle } from "../controllers/authController.js";

const authRouter = express.Router();

//When a POST request is made to /api/auth/authGoogle, call the function authGoogle to handle it
authRouter.post("/authGoogle", authGoogle);

export default authRouter;
