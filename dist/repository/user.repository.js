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
const UserRepository = {
    postUser: (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = new user_schema_1.User({ username, email, password });
            const postUser = yield newUser.save();
            return postUser;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUser = yield user_schema_1.User.find();
            return allUser;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    getDetail: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const detailUser = yield user_schema_1.User.findById(userId);
            return detailUser;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    patchUser: (userId, username, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchUser = yield user_schema_1.User.findByIdAndUpdate(userId, {
                username,
                email,
            });
            return patchUser;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
    deleteUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteUser = yield user_schema_1.User.findByIdAndDelete(userId);
            return deleteUser;
        }
        catch (error) {
            console.log("DB Error : " + error);
        }
    }),
};
exports.default = UserRepository;
