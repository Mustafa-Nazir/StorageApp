import { Document, Types } from "mongoose";
import IModel from "../../Core/Models/Abstract/IModel";

export default interface IAnnouncement extends IModel , Document{
    categoryId:string | Types.ObjectId,
    title:string,
    content:string,
    email:string,
    date:Date,
    status:boolean
}