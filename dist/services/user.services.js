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
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const UserService = {
    postUser: (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (username.length <= 4) {
                console.log("Username length too short");
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                console.log("Invalid email format");
                return;
            }
            const postUser = yield user_repository_1.default.postUser(username, email, password);
            return postUser;
        }
        catch (error) {
            console.log("User Service Error : " + error);
        }
    }),
    getAllUser: (accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const allUser = yield user_repository_1.default.getAll();
            return Object.assign(Object.assign({}, checkToken), { allUser });
        }
        catch (error) {
            console.log("User Service Error : " + error);
        }
    }),
    getUserDetail: (userId, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const detailUser = yield user_repository_1.default.getDetail(userId);
            return Object.assign(Object.assign({}, checkToken), { detailUser });
        }
        catch (error) {
            console.log("User Service Error : " + error);
        }
    }),
    patchUser: (userId, username, email, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            if (username.length <= 4) {
                console.log("Username length too short");
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                console.log("Invalid email format");
                return;
            }
            const patchUser = yield user_repository_1.default.patchUser(userId, username, email);
            return Object.assign(Object.assign({}, checkToken), { patchUser });
        }
        catch (error) {
            console.log("User Service Error : " + error);
        }
    }),
    deleteUser: (userId, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkToken = yield auth_services_1.default.checkRefreshToken(accessToken, refreshToken);
            const deleteUser = yield user_repository_1.default.deleteUser(userId);
            return Object.assign(Object.assign({}, checkToken), { deleteUser });
        }
        catch (error) {
            console.log("User Service Error : " + error);
        }
    }),
};
exports.default = UserService;
