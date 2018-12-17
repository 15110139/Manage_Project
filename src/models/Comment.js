import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    taskId: { type: String, ref: "Task" },
    userId: {
      type: String,
      ref: "User"
    },
    content: {
      type: String
    },
    tag: [{ type: String, ref: "User" }],
    data: {
      type: String
    }
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
