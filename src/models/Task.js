import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const TaskSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    listTaskId: { type: String, ref: "ListTask" },
    projectId: { type: String, ref: "listTask" },
    title: {
      type: String
    },
    describe: {
      type: String
    },
    members: [{ type: String, ref: "User" }],
    timeExpired: {
      type: Date
    }
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
