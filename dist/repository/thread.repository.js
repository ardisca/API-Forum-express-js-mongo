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
const thread_schema_1 = require("../models/thread.schema");
const ThreadRepository = {
    postThread: (title, content, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newThread = new thread_schema_1.Thread({ title, content, userId });
            const postThread = yield newThread.save();
            return postThread;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allThread = yield thread_schema_1.Thread.find().populate("userId");
            return allThread;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    getDetail: (threadId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const detailThread = yield thread_schema_1.Thread.findById(threadId).populate("userId");
            return detailThread;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    patchThread: (title, content, threadId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchThread = yield thread_schema_1.Thread.findByIdAndUpdate(threadId, {
                title,
                content,
            });
            return patchThread;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    deleteThread: (threadId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteThread = yield thread_schema_1.Thread.findByIdAndDelete(threadId);
            console.log("Deleted");
            return deleteThread;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
};
exports.default = ThreadRepository;
