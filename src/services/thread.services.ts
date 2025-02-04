import ThreadRepository from "../repository/thread.repository";
import authService from "../services/auth.services";

const threadService = {
  postThread: async (
    title: string,
    content: string,
    userId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      if (title.length <= 5) {
        console.log("title length too short");
        return;
      }
      if (content.length <= 1) {
        console.log("content length too short");
        return;
      }
      const postThread = await ThreadRepository.postThread(
        title,
        content,
        userId
      );
      return { ...checkToken, postThread };
    } catch (error) {
      console.log("Thread Service Error : " + error);
    }
  },
  getAllThread: async (accessToken: string, refreshToken: string) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );

      const allThread = await ThreadRepository.getAll();
      return { ...checkToken, allThread };
    } catch (error) {
      console.log("Thread Service Error : " + error);
    }
  },
  getThreadDetail: async (
    threadId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      const detailThread = await ThreadRepository.getDetail(threadId);
      return { ...checkToken, detailThread };
    } catch (error) {
      console.log("Thread Service Error : " + error);
    }
  },
  patchThread: async (
    title: string,
    content: string,
    threadId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      if (title.length <= 5) {
        console.log("title length too short");
        return;
      }
      if (content.length <= 1) {
        console.log("content length too short");
        return;
      }
      const patchThread = await ThreadRepository.patchThread(
        title,
        content,
        threadId
      );
      return { ...checkToken, patchThread };
    } catch (error) {
      console.log("Thread Service Error : " + error);
    }
  },
  deleteThread: async (
    threadId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      const deleteThread = await ThreadRepository.deleteThread(threadId);
      return { ...checkToken, deleteThread };
    } catch (error) {
      console.log("Thread Service Error : " + error);
    }
  },
};

export default threadService;
