import { Replies } from "../models/replies.schema";

const RepliesRepository = {
  postReplies: async (threadId: string, userId: string, content: string) => {
    try {
      const newReplies = new Replies({ threadId, userId, content });
      const postReplies = await newReplies.save();
      return postReplies;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  getAll: async () => {
    try {
      const allReplies = await Replies.find()
        .populate("userId")
        .populate("threadId");
      return allReplies;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  getDetail: async (repliesId: string) => {
    try {
      const detailReplies = await Replies.findById(repliesId)
        .populate("userId")
        .populate("threadId");
      return detailReplies;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  patchReplies: async (repliesId: string, content: string) => {
    try {
      const patchReplies = await Replies.findByIdAndUpdate(repliesId, {
        content,
      });
      return patchReplies;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
  deleteReplies: async (repliesId: string) => {
    try {
      const deleteReplies = await Replies.findByIdAndDelete(repliesId);
      console.log("Deleted");
      return deleteReplies;
    } catch (error) {
      console.log("DB Error : " + error);
    }
  },
};

export default RepliesRepository;
