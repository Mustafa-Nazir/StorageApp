import { Document, Types } from "mongoose";
import IModel from "../../Core/Models/Abstract/IModel";

export default interface IFolder extends IModel , Document{
    name:string,
    currentFolderId:string | Types.ObjectId,
    libraryId:string | Types.ObjectId
}