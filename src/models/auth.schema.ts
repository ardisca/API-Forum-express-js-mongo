import { model, Schema } from "mongoose";

const authSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: String,
});

export const Auth = model("Auth", authSchema);
