import mongoose from "mongoose";

const ActiveSchema = new mongoose.Schema(
  {
    projectId: { type: String, ref: "Project" },
    type: { String },
    idTask: { type: String, ref: "Task" },
    listId: { type: String, ref: "List" },
    activeByUserId: {
      type: String,
      ref: "User"
    },
    userId: { type: String, ref: "User" },
    listIdToMove: { type: String, ref: "List" }
  },
  { timestamps: true }
);

const ActiveModel = mongoose.model("Active", ActiveSchema);
export default ActiveModel;
