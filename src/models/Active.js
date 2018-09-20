import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
var UUID = mongoose.Types.UUID;
const uuid = require("node-uuid");
const ActiveSchema = new mongoose.Schema(
  {
    _id: { type: UUID, default: uuid.v4 },
    user: {
      type: UUID,
      ref: "User"
    },
    content: {
      type: String
    }
  },
  { timestamps: true }
);

const ActiveSchema = mongoose.model("Active", ActiveSchema);
export default ActiveSchema;
