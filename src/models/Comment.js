import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
var UUID = mongoose.Types.UUID;
const uuid = require("node-uuid");

const CommentSchema = new mongoose.Schema(
  {
    _id: { type: UUID, default: uuid.v4 },
    user: {
      type: UUID,
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

const CommentSchema = mongoose.model("Comment", CommentSchema);
export default CommentSchema;
