import type { Request, Response } from "express";
import repliesService from "../services/replies.services";

const RepliesController = {
  heandleGetAllReplies: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const allReplies = await repliesService.getAllReplies(
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", allReplies?.accessToken, { httpOnly: true })
        .cookie("refreshToken", allReplies?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: allReplies?.allReplies });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandleGetDetailReplies: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const repliesId = req.params.id;
      const detailReplies = await repliesService.getRepliesDetail(
        repliesId,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", detailReplies?.accessToken, { httpOnly: true })
        .cookie("refreshToken", detailReplies?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: detailReplies?.detailReplies });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandlePostReplies: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const { threadId, userId, content } = req.body;

      const postReplies = await repliesService.postReplies(
        threadId,
        userId,
        content,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", postReplies?.accessToken, { httpOnly: true })
        .cookie("refreshToken", postReplies?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: postReplies?.postReplies });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandlePatchReplies: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const repliesId = req.params.id;
      const { content } = req.body;

      const patchReplies = await repliesService.patchReplies(
        repliesId,
        content,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", patchReplies?.accessToken, { httpOnly: true })
        .cookie("refreshToken", patchReplies?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: patchReplies?.patchReplies });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandleDeleteReplies: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const repliesId = req.params.id;
      const deleteReplies = await repliesService.deleteReplies(
        repliesId,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", deleteReplies?.accessToken, { httpOnly: true })
        .cookie("refreshToken", deleteReplies?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: deleteReplies?.deleteReplies });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};

export default RepliesController;
