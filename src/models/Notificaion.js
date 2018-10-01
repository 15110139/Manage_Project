import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const ListSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    projectId: { type: String, ref: "Project" },
    work: { type: String }
  },
  { timestamps: true }
);

const ListModel = mongoose.model("List", ListSchema);
export default ListModel;
