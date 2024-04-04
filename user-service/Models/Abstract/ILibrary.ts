import { Document, Types } from "mongoose";
import IModel from "../../Core/Models/Abstract/IModel";

export default interface ILibrary extends IModel , Document{
    name:string,
    ownerId: Types.ObjectId | string,
    sizeGb:number,
    roles:{
        _id?:Types.ObjectId | string,
        name:string
    }[],
    departments:{
        _id?:Types.ObjectId | string,
        name:string
    }[],
    users:{
        userId:Types.ObjectId | string,
        roleId:Types.ObjectId | string,
        departmentId:Types.ObjectId | string,
    }[]
}