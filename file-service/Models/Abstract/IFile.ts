import { Document, Types } from "mongoose";
import IModel from "../../Core/Models/Abstract/IModel";

export default interface IFile extends IModel,Document{
    name:string,
    email:string,
    url:string,
    folderId:string | Types.ObjectId,
    libraryId:string | Types.ObjectId,
    departmentId:string | Types.ObjectId,
    date:Date,
    password:string,
    size:number
}