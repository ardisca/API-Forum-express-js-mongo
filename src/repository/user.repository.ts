import { User } from "../models/user.schema";

const UserRepository = {
  postUser: async (username: string, email: string, password: string) => {
    try {
      const newUser = new User({ username, email, password });
      const postUser = await newUser.save();
      return postUser;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  getAll: async () => {
    try {
      const allUser = await User.find();
      return allUser;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  getDetail: async (userId: string) => {
    try {
      const detailUser = await User.findById(userId);
      return detailUser;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  patchUser: async (userId: string, username: string, email: string) => {
    try {
      const patchUser = await User.findByIdAndUpdate(userId, {
        username,
        email,
      });
      return patchUser;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  deleteUser: async (userId: string) => {
    try {
      const deleteUser = await User.findByIdAndDelete(userId);
      return deleteUser;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
};

export default UserRepository;
