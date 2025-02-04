"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const replies_schema_1 = require("../models/replies.schema");
const RepliesRepository = {
    postReplies: (threadId, userId, content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newReplies = new replies_schema_1.Replies({ threadId, userId, content });
            const postReplies = yield newReplies.save();
            return postReplies;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allReplies = yield replies_schema_1.Replies.find()
                .populate("userId")
                .populate("threadId");
            return allReplies;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    getDetail: (repliesId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const detailReplies = yield replies_schema_1.Replies.findById(repliesId)
                .populate("userId")
                .populate("threadId");
            return detailReplies;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    patchReplies: (repliesId, content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchReplies = yield replies_schema_1.Replies.findByIdAndUpdate(repliesId, {
                content,
            });
            return patchReplies;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    deleteReplies: (repliesId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteReplies = yield replies_schema_1.Replies.findByIdAndDelete(repliesId);
            console.log("Deleted");
            return deleteReplies;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
};
exports.default = RepliesRepository;
