import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
var UUID = mongoose.Types.UUID;
const uuid = require("node-uuid");

const ListTaskSchema = new mongoose.Schema(
  {
    _id: { type: UUID, default: uuid.v4 },
    name: {
      type: String,
      required: true,
      unique: true
    },
    tasks: [{ type: String, ref: "Task" }]
  },
  { timestamps: true }
);

const ListTaskSchema = mongoose.model("ListTask", ListTaskSchema);
export default ListTaskSchema;
