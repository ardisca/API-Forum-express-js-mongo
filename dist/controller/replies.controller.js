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
const replies_services_1 = __importDefault(require("../services/replies.services"));
const RepliesController = {
    heandleGetAllReplies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const allReplies = yield replies_services_1.default.getAllReplies(accessToken, refreshToken);
            res
                .cookie("accessToken", allReplies === null || allReplies === void 0 ? void 0 : allReplies.accessToken, { httpOnly: true })
                .cookie("refreshToken", allReplies === null || allReplies === void 0 ? void 0 : allReplies.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: allReplies === null || allReplies === void 0 ? void 0 : allReplies.allReplies });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandleGetDetailReplies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const repliesId = req.params.id;
            const detailReplies = yield replies_services_1.default.getRepliesDetail(repliesId, accessToken, refreshToken);
            res
                .cookie("accessToken", detailReplies === null || detailReplies === void 0 ? void 0 : detailReplies.accessToken, { httpOnly: true })
                .cookie("refreshToken", detailReplies === null || detailReplies === void 0 ? void 0 : detailReplies.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: detailReplies === null || detailReplies === void 0 ? void 0 : detailReplies.detailReplies });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandlePostReplies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const { threadId, userId, content } = req.body;
            const postReplies = yield replies_services_1.default.postReplies(threadId, userId, content, accessToken, refreshToken);
            res
                .cookie("accessToken", postReplies === null || postReplies === void 0 ? void 0 : postReplies.accessToken, { httpOnly: true })
                .cookie("refreshToken", postReplies === null || postReplies === void 0 ? void 0 : postReplies.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: postReplies === null || postReplies === void 0 ? void 0 : postReplies.postReplies });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandlePatchReplies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const repliesId = req.params.id;
            const { content } = req.body;
            const patchReplies = yield replies_services_1.default.patchReplies(repliesId, content, accessToken, refreshToken);
            res
                .cookie("accessToken", patchReplies === null || patchReplies === void 0 ? void 0 : patchReplies.accessToken, { httpOnly: true })
                .cookie("refreshToken", patchReplies === null || patchReplies === void 0 ? void 0 : patchReplies.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: patchReplies === null || patchReplies === void 0 ? void 0 : patchReplies.patchReplies });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandleDeleteReplies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const repliesId = req.params.id;
            const deleteReplies = yield replies_services_1.default.deleteReplies(repliesId, accessToken, refreshToken);
            res
                .cookie("accessToken", deleteReplies === null || deleteReplies === void 0 ? void 0 : deleteReplies.accessToken, { httpOnly: true })
                .cookie("refreshToken", deleteReplies === null || deleteReplies === void 0 ? void 0 : deleteReplies.refreshToken, { httpOnly: true })
                .status(200)
                .json({ message: deleteReplies === null || deleteReplies === void 0 ? void 0 : deleteReplies.deleteReplies });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
};
exports.default = RepliesController;
