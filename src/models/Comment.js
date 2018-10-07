import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const CommentSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuid.v4 },
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
