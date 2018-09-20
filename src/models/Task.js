import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
var UUID = mongoose.Types.UUID;
const uuid = require("node-uuid");

const TaskSchema = new mongoose.Schema(
  {
    _id: { type: UUID, default: uuid.v4 },
    title: {
      type: String
    },
    describe: {
      type: String
    },
    members: [{ type: UUID, ref: "User" }],
    timeExpired: {
      type: Date
    },
    comments: [{ type: UUID, ref: "Comment" }],
    actives: [{ type: UUID, ref: "Active" }]
  },
  { timestamps: true }
);

const TaskSchema = mongoose.model("Task", TaskSchema);
export default TaskSchema;
