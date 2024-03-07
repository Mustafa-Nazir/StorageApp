import { Document, Types } from "mongoose";
import IModel from "../../Core/Models/Abstract/IModel";

export default interface IUserWaitingList extends IModel , Document{
    email:string,
    libraryId:string | Types.ObjectId,
    roleId:string | Types.ObjectId,
    departmentId:string | Types.ObjectId,
}