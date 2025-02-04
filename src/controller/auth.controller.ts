import type { Request, Response } from "express";
import authService from "../services/auth.services";

const AuthController = {
  heandleLogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const response = await authService.login(email, password);
      res
        .cookie("accessToken", response.accessToken, { httpOnly: true })
        .cookie("refreshToken", response.refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: "Login Success" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      res.status(403).json({ message: errorMessage });
    }
  },
  heandleLogout: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json({ message: "Success log out" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      res.status(404).json({ message: errorMessage });
    }
  },
  heandleRegistration: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const response = await authService.registration(
        username,
        email,
        password
      );
      if (response) {
        res.json({ message: "User Register Succsess" });
      } else {
        res.json({ message: "Failled" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      res.status(404).json({ message: errorMessage });
    }
  },
};
export default AuthController;
