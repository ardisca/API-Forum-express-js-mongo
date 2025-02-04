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
const thread_repository_1 = __importDefault(require("../repository/thread.repository"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const threadService = {
    postThread: (title, content, userId, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            if (title.length <= 5) {
                console.log("title length too short");
                return;
            }
            if (content.length <= 1) {
                console.log("content length too short");
                return;
            }
            const postThread = yield thread_repository_1.default.postThread(title, content, userId);
            return Object.assign(Object.assign({}, checkToken), { postThread });
        }
        catch (error) {
            console.log("Thread Service Error : " + error);
        }
    }),
    getAllThread: (accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const allThread = yield thread_repository_1.default.getAll();
            return Object.assign(Object.assign({}, checkToken), { allThread });
        }
        catch (error) {
            console.log("Thread Service Error : " + error);
        }
    }),
    getThreadDetail: (threadId, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const detailThread = yield thread_repository_1.default.getDetail(threadId);
            return Object.assign(Object.assign({}, checkToken), { detailThread });
        }
        catch (error) {
            console.log("Thread Service Error : " + error);
        }
    }),
    patchThread: (title, content, threadId, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            if (title.length <= 5) {
                console.log("title length too short");
                return;
            }
            if (content.length <= 1) {
                console.log("content length too short");
                return;
            }
            const patchThread = yield thread_repository_1.default.patchThread(title, content, threadId);
            return Object.assign(Object.assign({}, checkToken), { patchThread });
        }
        catch (error) {
            console.log("Thread Service Error : " + error);
        }
    }),
    deleteThread: (threadId, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const deleteThread = yield thread_repository_1.default.deleteThread(threadId);
            return Object.assign(Object.assign({}, checkToken), { deleteThread });
        }
        catch (error) {
            console.log("Thread Service Error : " + error);
        }
    }),
};
exports.default = threadService;
