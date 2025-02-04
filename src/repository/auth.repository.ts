import { User } from "../models/user.schema";
import { Auth } from "../models/auth.schema";

const AuthRepository = {
  findUserByEmail: async (email: string) => {
    try {
      const userData = await User.findOne({ email });
      return userData;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  saveRefreshToken: async (userId: string, refreshToken: string) => {
    try {
      const newRefreshToken = new Auth({ userId, refreshToken });
      await newRefreshToken.save();
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  findOneAndDeleteRefreshToken: async (refreshToken: string) => {
    try {
      await Auth.findOneAndDelete({ refreshToken });
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  findRefreshToken: async (refreshToken: string) => {
    try {
      return await Auth.findOne({ refreshToken });
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
};

export default AuthRepository;
