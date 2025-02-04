import express from "express";
import UserController from "../controller/user.controller";

export const userRouter = express.Router();

userRouter.get("/", UserController.heandleGetAllUser);
userRouter.post("/", UserController.heandlePostUser);
userRouter.get("/:id", UserController.heandleGetDetailUser);
userRouter.patch("/:id", UserController.heandlePatchUser);
userRouter.delete("/:id", UserController.heandleDeleteUser);
