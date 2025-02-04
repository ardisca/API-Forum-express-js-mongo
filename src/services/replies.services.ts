import RepliesRepository from "../repository/replies.repository";
import authService from "../services/auth.services";

const RepliesService = {
  postReplies: async (
    threadId: string,
    userId: string,
    content: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      if (content.length <= 1) {
        console.log("content length too short");
        return;
      }
      const postReplies = await RepliesRepository.postReplies(
        threadId,
        userId,
        content
      );
      return { ...checkToken, postReplies };
    } catch (error) {
      console.log("Replies Service Error : " + error);
    }
  },
  getAllReplies: async (accessToken: string, refreshToken: string) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      const allReplies = await RepliesRepository.getAll();
      return { ...checkToken, allReplies };
    } catch (error) {
      console.log("Replies Service Error : " + error);
    }
  },
  getRepliesDetail: async (
    repliesId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      const detailReplies = await RepliesRepository.getDetail(repliesId);
      return { ...checkToken, detailReplies };
    } catch (error) {
      console.log("Replies Service Error : " + error);
    }
  },
  patchReplies: async (
    repliesId: string,
    content: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      if (content.length <= 1) {
        console.log("content length too short");
        return;
      }
      const patchReplies = await RepliesRepository.patchReplies(
        repliesId,
        content
      );
      return { ...checkToken, patchReplies };
    } catch (error) {
      console.log("Replies Service Error : " + error);
    }
  },
  deleteReplies: async (
    repliesId: string,
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      const checkToken = await authService.checkRefreshToken(
        accessToken,
        refreshToken
      );
      const deleteReplies = await RepliesRepository.deleteReplies(repliesId);
      return { ...checkToken, deleteReplies };
    } catch (error) {
      console.log("Replies Service Error : " + error);
    }
  },
};

export default RepliesService;
