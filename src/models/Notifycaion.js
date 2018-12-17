import mongoose from "mongoose";


const NotifycationSchema = new mongoose.Schema(
  {
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
