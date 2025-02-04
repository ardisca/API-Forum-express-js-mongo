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
const auth_services_1 = __importDefault(require("../services/auth.services"));
const AuthController = {
    heandleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const response = yield auth_services_1.default.login(email, password);
            res
                .cookie("accessToken", response.accessToken, { httpOnly: true })
                .cookie("refreshToken", response.refreshToken, { httpOnly: true })
                .status(200)
                .json({ message: "Login Success" });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            res.status(403).json({ message: errorMessage });
        }
    }),
    heandleLogout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.cookies;
            yield auth_services_1.default.logout(refreshToken);
            res
                .clearCookie("accessToken")
                .clearCookie("refreshToken")
                .json({ message: "Success log out" });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            res.status(404).json({ message: errorMessage });
        }
    }),
    heandleRegistration: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const response = yield auth_services_1.default.registration(username, email, password);
            if (response) {
                res.json({ message: "User Register Succsess" });
            }
            else {
                res.json({ message: "Failled" });
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            res.status(404).json({ message: errorMessage });
        }
    }),
};
exports.default = AuthController;
