import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./db/database.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // to parse form data in the req.body
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => {
  console.log("server is listening on port " + port);
});

connectDB(process.env.MONGO_URI);
