import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
// import pinDetails from "./routes/pinDetails.js";

import authRouter from "./routes/authRouter.js";
import commentRouter from "./routes/commentRouter.js";

import "dotenv/config";

//app config
const app = express(); //creates an instance of an Express application
const port = 4000;

//middleware
//app.use() is used to add middleware to the Express application.

app.use(express.json()); //JSON payloads are automatically parsed into JavaScript objects, making it easy to access and work with the data

//Cross-Origin Resource Sharing (CORS).
app.use(cors()); // enabled CORS for all routes and origins by default.

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

/**  This means the API will be accessible from any other domain, 
    allowing the frontend application or other external clients to interact with your backend API.
    Without enabling CORS, the frontend application would be blocked from making requests 
    to http://localhost:${port} due to the same-origin policy. **/

//db connection
connectDB(); //connection with mongooseeeeee

//api endpoints

//For any route that starts with /api/auth, pass the request to authRouter to handle it.
app.use("/api/auth", authRouter);

app.use("/api/comments", commentRouter);

// app.use("/pinDetails", pinDetails);
// The string "/api/food" is a base path. It means that all routes defined in foodRouter will be prefixed with /api/food.

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

// mongodb+srv://greatstack:Helloworld321@cluster0.hngbi.mongodb.net/?
