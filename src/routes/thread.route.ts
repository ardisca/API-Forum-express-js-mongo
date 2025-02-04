import express from "express";
import ThreadController from "../controller/thread.controller";

export const threadRouter = express.Router();

threadRouter.get("/", ThreadController.heandleGetAllThread);
threadRouter.post("/", ThreadController.heandlePostThread);
threadRouter.get("/:id", ThreadController.heandleGetDetailThread);
threadRouter.patch("/:id", ThreadController.heandlePatchThread);
threadRouter.delete("/:id", ThreadController.heandleDeleteThread);
