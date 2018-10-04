import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const NotifycationSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    userId: {
      type: String,
      ref: "User"
    },
    projectId: { type: String, ref: "Project" },
    content: { type: String }
  },
  { timestamps: true }
);

const NotifycationModel = mongoose.model("Notifycation", NotifycationSchema);
export default NotifycationModel;
