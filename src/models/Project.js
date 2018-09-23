import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const ProjectSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    name: {
      type: String,
      required: true,
      unique: true
    },

    backgroundUrl: {
      type: String,
      default:
        "http://thuthuatphanmem.vn/uploads/2018/04/24/hinh-nen-2018-bai-bien-dep_090320037.jpg"
    },
    userId: { type: String, ref: "Project" },

    members: [{ type: String, ref: "User" }]
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);
export default ProjectModel;
