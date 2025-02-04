import type { Request, Response } from "express";
import userService from "../services/user.services";

const UserController = {
  heandleGetAllUser: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const allUSer = await userService.getAllUser(accessToken, refreshToken);
      res
        .cookie("accessToken", allUSer?.accessToken, { httpOnly: true })
        .cookie("refreshToken", allUSer?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: allUSer?.allUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandleGetDetailUser: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const userId = req.params.id;
      const detailUSer = await userService.getUserDetail(
        userId,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", detailUSer?.accessToken, { httpOnly: true })
        .cookie("refreshToken", detailUSer?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: detailUSer?.detailUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandlePostUser: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const postUser = await userService.postUser(username, email, password);
      res.status(200).json({ data: postUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandlePatchUser: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const userId = req.params.id;
      const { username, email } = req.body;
      const patchUser = await userService.patchUser(
        userId,
        username,
        email,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", patchUser?.accessToken, { httpOnly: true })
        .cookie("refreshToken", patchUser?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: patchUser?.patchUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandleDeleteUser: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const userId = req.params.id;
      const deleteUser = await userService.deleteUser(
        userId,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", deleteUser?.accessToken, { httpOnly: true })
        .cookie("refreshToken", deleteUser?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: deleteUser?.deleteUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};

export default UserController;
