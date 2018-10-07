import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
const Schema = mongoose.Schema;

import { ActivityTypes } from "../commons/Types";

const TemplateEmail = new Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        templateName: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
);
TemplateEmail.plugin(mongoosePaginate);
export default mongoose.model("TemplateEmail", TemplateEmail);
