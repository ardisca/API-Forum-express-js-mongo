"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Replies = void 0;
const mongoose_1 = require("mongoose");
const repliesSchema = new mongoose_1.Schema({
    threadId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Thread" },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    content: String,
});
exports.Replies = (0, mongoose_1.model)("Replies", repliesSchema);
