import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    projectId: { type: String, ref: "Project" },
    name: {
      type: String,
      required: true
    },
    position: {
      type: Number
    }
  },
  { timestamps: true }
);

const ListModel = mongoose.model("List", ListSchema);
export default ListModel;
