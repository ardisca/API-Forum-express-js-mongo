import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { userRouter } from "./routes/user.route";
import { threadRouter } from "./routes/thread.route";
import { repliesRouter } from "./routes/replies.route";
import { authRouter } from "./routes/auth.router";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected Mongo"))
  .catch((e) => {
    console.log("Failure");
    console.log(e);
  });

const app = express();
const version = "/api/v1";

app.use(express.json());
app.use(cookieParser());

app.use(`${version}/`, authRouter);
app.use(`${version}/user`, userRouter);
app.use(`${version}/thread`, threadRouter);
app.use(`${version}/replies`, repliesRouter);

app.listen(8000);
