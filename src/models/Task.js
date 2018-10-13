import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const TaskSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    listId: { type: String, ref: "List" },
    projectId: { type: String, ref: "Project" },
    title: {
      type: String
    },
    position: {
      type: Number
    },
    describe: {
      type: String
    },
    lable: [String],
    members: [{ type: String, ref: "User" }],
    timeExpired: {
      type: Date
    }
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
