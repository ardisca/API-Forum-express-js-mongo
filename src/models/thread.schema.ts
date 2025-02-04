import { model, Schema } from "mongoose";

const threadSchema = new Schema({
  title: String,
  content: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Thread = model("Thread", threadSchema);
