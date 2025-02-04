import AuthRepository from "../repository/auth.repository";
import UserRepository from "../repository/user.repository";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const AuthService = {
  login: async (email: string, password: string) => {
    if (!email || password.length < 8) {
      throw new Error("Email and password must be valid");
    }

    const user = await AuthRepository.findUserByEmail(email);
    if (!user) throw new Error("User not found");
    if (!user.password) throw new Error("Password not set");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error("Invalid Password");

    const payload = { id: user.id, name: user.username, email: user.email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: 60,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH as string, {
      expiresIn: "7d",
    });

    await AuthRepository.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  },
  logout: async (refreshToken: string) => {
    await AuthRepository.findOneAndDeleteRefreshToken(refreshToken);
  },
  registration: async (username: string, email: string, password: string) => {
    try {
      if (username.length <= 4) {
        console.log("Username length too short");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log("Invalid email format");
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const postUser = await UserRepository.postUser(
        username,
        email,
        hashedPassword
      );
      return postUser;
    } catch (error) {
      console.log("User Service Error : " + error);
    }
  },
  checkRefreshToken: async (accessToken: string, refreshToken: string) => {
    console.log(accessToken);
    console.log(refreshToken);
    if (!accessToken) throw new Error("Please re Login");
    try {
      jwt.verify(accessToken, process.env.JWT_SECRET as string);
      return { accessToken, refreshToken };
    } catch (error) {
      if (!refreshToken) throw new Error("Please re Login");

      try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH as string);
        const activeRefreshToken = await AuthRepository.findRefreshToken(
          refreshToken
        );
        if (!activeRefreshToken) throw new Error("Please re Login");

        const payload = jwt.decode(refreshToken);
        if (!payload) throw new Error("Please re Login");

        if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
          throw new Error("Please re Login");
        }
        const { id, name, email } = payload;

        const newPayload = { id, name, email };
        const newAccessToken = jwt.sign(
          newPayload,
          process.env.JWT_SECRET as string,
          {
            expiresIn: 60,
          }
        );
        return { accessToken: newAccessToken, refreshToken };
      } catch (error) {
        console.log(`di sini ${error}`);

        throw new Error("Please re Login");
      }
    }
  },
};

export default AuthService;
