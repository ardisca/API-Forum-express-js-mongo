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
const user_services_1 = __importDefault(require("../services/user.services"));
const UserController = {
    heandleGetAllUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const allUSer = yield user_services_1.default.getAllUser(accessToken, refreshToken);
            res
                .cookie("accessToken", allUSer === null || allUSer === void 0 ? void 0 : allUSer.accessToken, { httpOnly: true })
                .cookie("refreshToken", allUSer === null || allUSer === void 0 ? void 0 : allUSer.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: allUSer === null || allUSer === void 0 ? void 0 : allUSer.allUser });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandleGetDetailUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const userId = req.params.id;
            const detailUSer = yield user_services_1.default.getUserDetail(userId, accessToken, refreshToken);
            res
                .cookie("accessToken", detailUSer === null || detailUSer === void 0 ? void 0 : detailUSer.accessToken, { httpOnly: true })
                .cookie("refreshToken", detailUSer === null || detailUSer === void 0 ? void 0 : detailUSer.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: detailUSer === null || detailUSer === void 0 ? void 0 : detailUSer.detailUser });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandlePostUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const postUser = yield user_services_1.default.postUser(username, email, password);
            res.status(200).json({ data: postUser });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandlePatchUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const userId = req.params.id;
            const { username, email } = req.body;
            const patchUser = yield user_services_1.default.patchUser(userId, username, email, accessToken, refreshToken);
            res
                .cookie("accessToken", patchUser === null || patchUser === void 0 ? void 0 : patchUser.accessToken, { httpOnly: true })
                .cookie("refreshToken", patchUser === null || patchUser === void 0 ? void 0 : patchUser.refreshToken, { httpOnly: true })
                .status(200)
                .json({ data: patchUser === null || patchUser === void 0 ? void 0 : patchUser.patchUser });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    heandleDeleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.cookies;
            const userId = req.params.id;
            const deleteUser = yield user_services_1.default.deleteUser(userId, accessToken, refreshToken);
            res
                .cookie("accessToken", deleteUser === null || deleteUser === void 0 ? void 0 : deleteUser.accessToken, { httpOnly: true })
                .cookie("refreshToken", deleteUser === null || deleteUser === void 0 ? void 0 : deleteUser.refreshToken, { httpOnly: true })
                .status(200)
                .json({ message: deleteUser === null || deleteUser === void 0 ? void 0 : deleteUser.deleteUser });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
};
exports.default = UserController;
