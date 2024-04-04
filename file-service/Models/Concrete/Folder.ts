import { Schema, model } from "mongoose";
import IFolder from "../Abstract/IFolder";

const FolderSchema = new Schema<IFolder>({
    name:String,
    currentFolderId:{type:Schema.Types.ObjectId},
    libraryId:{type:Schema.Types.ObjectId}
});

export const Folder = model<IFolder>("Folder",FolderSchema);