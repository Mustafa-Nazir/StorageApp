import { Schema, model } from "mongoose";
import IAnnouncement from "../Abstract/IAnnouncement";

const AnnouncementSchema = new Schema<IAnnouncement>({
    categoryId : {type:Schema.Types.ObjectId},
    title:String,
    content:String,
    email:String,
    date:{type:Date , default:Date.now},
    status:Boolean
});

export const Announcement = model<IAnnouncement>("Announcement",AnnouncementSchema);