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
const replies_repository_1 = __importDefault(require("../repository/replies.repository"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const RepliesService = {
    postReplies: (threadId, userId, content, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            if (content.length <= 1) {
                console.log("content length too short");
                return;
            }
            const postReplies = yield replies_repository_1.default.postReplies(threadId, userId, content);
            return Object.assign(Object.assign({}, checkToken), { postReplies });
        }
        catch (error) {
            console.log("Replies Service Error : " + error);
        }
    }),
    getAllReplies: (accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const allReplies = yield replies_repository_1.default.getAll();
            return Object.assign(Object.assign({}, checkToken), { allReplies });
        }
        catch (error) {
            console.log("Replies Service Error : " + error);
        }
    }),
    getRepliesDetail: (repliesId, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const detailReplies = yield replies_repository_1.default.getDetail(repliesId);
            return Object.assign(Object.assign({}, checkToken), { detailReplies });
        }
        catch (error) {
            console.log("Replies Service Error : " + error);
        }
    }),
    patchReplies: (repliesId, content, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            if (content.length <= 1) {
                console.log("content length too short");
                return;
            }
            const patchReplies = yield replies_repository_1.default.patchReplies(repliesId, content);
            return Object.assign(Object.assign({}, checkToken), { patchReplies });
        }
        catch (error) {
            console.log("Replies Service Error : " + error);
        }
    }),
    deleteReplies: (repliesId, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const deleteReplies = yield replies_repository_1.default.deleteReplies(repliesId);
            return Object.assign(Object.assign({}, checkToken), { deleteReplies });
        }
        catch (error) {
            console.log("Replies Service Error : " + error);
        }
    }),
};
exports.default = RepliesService;
