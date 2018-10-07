import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { ActivityTypes } from "../commons/Types";

const MailError = new Schema(
  {
    payload: {
      type: Object
    },
    errorMessage: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("MailError", MailError);
