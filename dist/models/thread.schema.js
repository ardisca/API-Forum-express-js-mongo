"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
const mongoose_1 = require("mongoose");
const threadSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.Thread = (0, mongoose_1.model)("Thread", threadSchema);
