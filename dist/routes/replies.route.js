"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repliesRouter = void 0;
const express_1 = __importDefault(require("express"));
const replies_controller_1 = __importDefault(require("../controller/replies.controller"));
exports.repliesRouter = express_1.default.Router();
exports.repliesRouter.get("/", replies_controller_1.default.heandleGetAllReplies);
exports.repliesRouter.post("/", replies_controller_1.default.heandlePostReplies);
exports.repliesRouter.get("/:id", replies_controller_1.default.heandleGetDetailReplies);
exports.repliesRouter.patch("/:id", replies_controller_1.default.heandlePatchReplies);
exports.repliesRouter.delete("/:id", replies_controller_1.default.heandleDeleteReplies);
