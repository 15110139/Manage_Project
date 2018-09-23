import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const CommentSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuid.v4 },
    idTask: { type: String, ref: "Task" },
    userId: {
      type: String,
      ref: "User"
    },
    content: {
      type: String
    },
    data: {
      type: String
    }
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
