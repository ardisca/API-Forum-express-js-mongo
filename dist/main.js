"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = require("./routes/user.route");
const thread_route_1 = require("./routes/thread.route");
const replies_route_1 = require("./routes/replies.route");
const auth_router_1 = require("./routes/auth.router");
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected Mongo"))
    .catch((e) => {
    console.log("Failure");
    console.log(e);
});
const app = (0, express_1.default)();
const version = "/api/v1";
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(`${version}/`, auth_router_1.authRouter);
app.use(`${version}/user`, user_route_1.userRouter);
app.use(`${version}/thread`, thread_route_1.threadRouter);
app.use(`${version}/replies`, replies_route_1.repliesRouter);
app.listen(8000);
