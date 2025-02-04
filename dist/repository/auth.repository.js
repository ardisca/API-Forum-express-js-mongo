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
const user_schema_1 = require("../models/user.schema");
const auth_schema_1 = require("../models/auth.schema");
const AuthRepository = {
    findUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield user_schema_1.User.findOne({ email });
            return userData;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    saveRefreshToken: (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newRefreshToken = new auth_schema_1.Auth({ userId, refreshToken });
            yield newRefreshToken.save();
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    findOneAndDeleteRefreshToken: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield auth_schema_1.Auth.findOneAndDelete({ refreshToken });
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    findRefreshToken: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield auth_schema_1.Auth.findOne({ refreshToken });
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
};
exports.default = AuthRepository;
