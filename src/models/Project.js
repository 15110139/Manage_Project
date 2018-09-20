import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
var UUID = mongoose.Types.UUID;
const uuid = require("node-uuid");

const ProjectSchema = new mongoose.Schema(
  {
    _id: { type: UUID, default: uuid.v4 },
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
    userId: { type: UUID, ref: "Project" },

    members: [{ type: UUID, ref: "User" }]
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);
export default ProjectModel;
