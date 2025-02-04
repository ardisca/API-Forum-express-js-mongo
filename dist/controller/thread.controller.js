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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const thread_services_1 = __importDefault(require("../services/thread.services"));
const ThreadController = {
    heandleGetAllThread: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const allThread = yield thread_services_1.default.getAllThread(accessToken, refreshToken);
            res
                .cookie("accessToken", allThread === null || allThread === void 0 ? void 0 : allThread.accessToken, { httpOnly: true })
                .cookie("refreshToken", allThread === null || allThread === void 0 ? void 0 : allThread.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: allThread === null || allThread === void 0 ? void 0 : allThread.allThread });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandleGetDetailThread: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const threadId = req.params.id;
            const detailThread = yield thread_services_1.default.getThreadDetail(threadId, accessToken, refreshToken);
            res.status(200).json({ data: detailThread === null || detailThread === void 0 ? void 0 : detailThread.detailThread });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandlePostThread: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const { title, content, userId } = req.body;
            const postThread = yield thread_services_1.default.postThread(title, content, userId, accessToken, refreshToken);
            res
                .cookie("accessToken", postThread === null || postThread === void 0 ? void 0 : postThread.accessToken, { httpOnly: true })
                .cookie("refreshToken", postThread === null || postThread === void 0 ? void 0 : postThread.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: postThread === null || postThread === void 0 ? void 0 : postThread.postThread });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandlePatchThread: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const threadId = req.params.id;
            const { title, content } = req.body;
            console.log({ title, content, threadId });
            const patchThread = yield thread_services_1.default.patchThread(title, content, threadId, accessToken, refreshToken);
            res
                .cookie("accessToken", patchThread === null || patchThread === void 0 ? void 0 : patchThread.accessToken, { httpOnly: true })
                .cookie("refreshToken", patchThread === null || patchThread === void 0 ? void 0 : patchThread.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: patchThread === null || patchThread === void 0 ? void 0 : patchThread.patchThread });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandleDeleteThread: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const threadId = req.params.id;
            const deleteThread = yield thread_services_1.default.deleteThread(threadId, accessToken, refreshToken);
            res
                .cookie("accessToken", deleteThread === null || deleteThread === void 0 ? void 0 : deleteThread.accessToken, { httpOnly: true })
                .cookie("refreshToken", deleteThread === null || deleteThread === void 0 ? void 0 : deleteThread.refreshToken, { httpOnly: true })
                .status(200)
                .json({ message: deleteThread === null || deleteThread === void 0 ? void 0 : deleteThread.deleteThread });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
};
exports.default = ThreadController;
