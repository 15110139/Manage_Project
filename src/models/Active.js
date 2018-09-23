import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");
const ActiveSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    idTask: { type: String, ref: "Task" },
    userId: {
      type: String,
      ref: "User"
    },
    content: {
      type: String
    }
  },
  { timestamps: true }
);

const ActiveModel = mongoose.model("Active", ActiveSchema);
export default ActiveModel;
