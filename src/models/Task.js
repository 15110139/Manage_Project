import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    listId: { type: String, ref: "List" },
    projectId: { type: String, ref: "Project" },
    name: {
      type: String
    },
    position: {
      type: Number
    },
    description: {
      type: String
    },
    label: [String],
    members: [{ type: String, ref: "User" }],
    timeExpired: {
      type: Number
    }
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
