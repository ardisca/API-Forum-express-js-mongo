import { model, Schema } from "mongoose";

const repliesSchema = new Schema({
  threadId: { type: Schema.Types.ObjectId, ref: "Thread" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
});

export const Replies = model("Replies", repliesSchema);
