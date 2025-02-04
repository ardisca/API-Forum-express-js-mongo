import express from "express";
import RepliesController from "../controller/replies.controller";

export const repliesRouter = express.Router();

repliesRouter.get("/", RepliesController.heandleGetAllReplies);
repliesRouter.post("/", RepliesController.heandlePostReplies);
repliesRouter.get("/:id", RepliesController.heandleGetDetailReplies);
repliesRouter.patch("/:id", RepliesController.heandlePatchReplies);
repliesRouter.delete("/:id", RepliesController.heandleDeleteReplies);
