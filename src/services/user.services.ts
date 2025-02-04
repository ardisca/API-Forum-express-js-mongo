import UserRepository from "../repository/user.repository";
import authService from "../services/auth.services";

const UserService = {
  postUser: async (username: string, email: string, password: string) => {
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
      const postUser = await UserRepository.postUser(username, email, password);
      return postUser;
    } catch (error) {
      console.log("User Service Error : " + error);
    }
  },
  getAllUser: async (accessToken: string, refreshToken: string) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      const allUser = await UserRepository.getAll();
      return { ...checkToken, allUser };
    } catch (error) {
      console.log("User Service Error : " + error);
    }
  },
  getUserDetail: async (
    userId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      const detailUser = await UserRepository.getDetail(userId);
      return { ...checkToken, detailUser };
    } catch (error) {
      console.log("User Service Error : " + error);
    }
  },
  patchUser: async (
    userId: string,
    username: string,
    email: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      if (username.length <= 4) {
        console.log("Username length too short");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log("Invalid email format");
        return;
      }
      const patchUser = await UserRepository.patchUser(userId, username, email);
      return { ...checkToken, patchUser };
    } catch (error) {
      console.log("User Service Error : " + error);
    }
  },
  deleteUser: async (
    userId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      const deleteUser = await UserRepository.deleteUser(userId);
      return { ...checkToken, deleteUser };
    } catch (error) {
      console.log("User Service Error : " + error);
    }
  },
};

export default UserService;
