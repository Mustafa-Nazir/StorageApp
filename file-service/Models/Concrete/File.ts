import { Schema, model } from "mongoose";
import IFile from "../Abstract/IFile";

const FileSchema = new Schema<IFile>({
    name:String,
    email:String,
    url:String,
    folderId:{type:Schema.Types.ObjectId},
    libraryId:{type:Schema.Types.ObjectId},
    departmentId:{type:Schema.Types.ObjectId},
    date:{type:Date , default:Date.now},
    password:{type:String},
    size:{type:Number , default:0}
})

export const File = model<IFile>("IFile",FileSchema);