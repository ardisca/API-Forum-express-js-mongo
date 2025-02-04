import { Thread } from "../models/thread.schema";

const ThreadRepository = {
  postThread: async (title: string, content: string, userId: string) => {
    try {
      const newThread = new Thread({ title, content, userId });
      const postThread = await newThread.save();
      return postThread;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  getAll: async () => {
    try {
      const allThread = await Thread.find().populate("userId");
      return allThread;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  getDetail: async (threadId: string) => {
    try {
      const detailThread = await Thread.findById(threadId).populate("userId");
      return detailThread;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  patchThread: async (title: string, content: string, threadId: string) => {
    try {
      const patchThread = await Thread.findByIdAndUpdate(threadId, {
        title,
        content,
      });
      return patchThread;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  deleteThread: async (threadId: string) => {
    try {
      const deleteThread = await Thread.findByIdAndDelete(threadId);
      console.log("Deleted");
      return deleteThread;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
};

export default ThreadRepository;
