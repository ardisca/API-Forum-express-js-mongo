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
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthService = {
    login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        if (!email || password.length < 8) {
            throw new Error("Email and password must be valid");
        }
        const user = yield auth_repository_1.default.findUserByEmail(email);
        if (!user)
            throw new Error("User not found");
        if (!user.password)
            throw new Error("Password not set");
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch)
            throw new Error("Invalid Password");
        const payload = { id: user.id, name: user.username, email: user.email };
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH, {
            expiresIn: "7d",
        });
        yield auth_repository_1.default.saveRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    }),
    logout: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        yield auth_repository_1.default.findOneAndDeleteRefreshToken(refreshToken);
    }),
    registration: (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
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
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const postUser = yield user_repository_1.default.postUser(username, email, hashedPassword);
            return postUser;
        }
        catch (error) {
            console.log("User Service Error : " + error);
        }
    }),
    checkRefreshToken: (accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(accessToken);
        console.log(refreshToken);
        if (!accessToken)
            throw new Error("Please re Login");
        try {
            jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
            return { accessToken, refreshToken };
        }
        catch (error) {
            if (!refreshToken)
                throw new Error("Please re Login");
            try {
                jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH);
                const activeRefreshToken = yield auth_repository_1.default.findRefreshToken(refreshToken);
                if (!activeRefreshToken)
                    throw new Error("Please re Login");
                const payload = jsonwebtoken_1.default.decode(refreshToken);
                if (!payload)
                    throw new Error("Please re Login");
                if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
                    throw new Error("Please re Login");
                }
                const { id, name, email } = payload;
                const newPayload = { id, name, email };
                const newAccessToken = jsonwebtoken_1.default.sign(newPayload, process.env.JWT_SECRET, {
                    expiresIn: 60,
                });
                return { accessToken: newAccessToken, refreshToken };
            }
            catch (error) {
                console.log(`di sini ${error}`);
                throw new Error("Please re Login");
            }
        }
    }),
};
exports.default = AuthService;
