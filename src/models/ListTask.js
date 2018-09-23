import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const ListTaskSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    projectId: { type: String, ref: "Project" },
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const ListTaskModel = mongoose.model("ListTask", ListTaskSchema);
export default ListTaskModel;
