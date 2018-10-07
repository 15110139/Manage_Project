import Base from "./base";
//Import models
import CommentModel from "../models/Comment";

class CommentHandlers extends Base {
  async createNewComment(userId, tag, taskId, content) {
    const newComment = await CommentModel.create({
      userId,
      taskId,
      content,
      tag
    });
    return newComment;
  }
  async getCommentById(commentId) {
    const comment = await CommentModel({ _id: commentId });
    return comment;
  }
  //
}
export default CommentHandlers;
