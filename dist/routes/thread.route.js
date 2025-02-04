"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.threadRouter = void 0;
const express_1 = __importDefault(require("express"));
const thread_controller_1 = __importDefault(require("../controller/thread.controller"));
exports.threadRouter = express_1.default.Router();
exports.threadRouter.get("/", thread_controller_1.default.heandleGetAllThread);
exports.threadRouter.post("/", thread_controller_1.default.heandlePostThread);
exports.threadRouter.get("/:id", thread_controller_1.default.heandleGetDetailThread);
exports.threadRouter.patch("/:id", thread_controller_1.default.heandlePatchThread);
exports.threadRouter.delete("/:id", thread_controller_1.default.heandleDeleteThread);
