import type { Request, Response } from "express";
import threadService from "../services/thread.services";

const ThreadController = {
  heandleGetAllThread: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const allThread = await threadService.getAllThread(
        accessToken,
        refreshToken
      );

      res
        .cookie("accessToken", allThread?.accessToken, { httpOnly: true })
        .cookie("refreshToken", allThread?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: allThread?.allThread });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandleGetDetailThread: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const threadId = req.params.id;
      const detailThread = await threadService.getThreadDetail(
        threadId,
        accessToken,
        refreshToken
      );
      res.status(200).json({ data: detailThread?.detailThread });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandlePostThread: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const { title, content, userId } = req.body;

      const postThread = await threadService.postThread(
        title,
        content,
        userId,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", postThread?.accessToken, { httpOnly: true })
        .cookie("refreshToken", postThread?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: postThread?.postThread });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandlePatchThread: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const threadId = req.params.id;
      const { title, content } = req.body;
      console.log({ title, content, threadId });

      const patchThread = await threadService.patchThread(
        title,
        content,
        threadId,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", patchThread?.accessToken, { httpOnly: true })
        .cookie("refreshToken", patchThread?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ data: patchThread?.patchThread });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  heandleDeleteThread: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      const threadId = req.params.id;
      const deleteThread = await threadService.deleteThread(
        threadId,
        accessToken,
        refreshToken
      );
      res
        .cookie("accessToken", deleteThread?.accessToken, { httpOnly: true })
        .cookie("refreshToken", deleteThread?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: deleteThread?.deleteThread });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};

export default ThreadController;
