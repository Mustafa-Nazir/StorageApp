import { Document, Types } from "mongoose";
import IModel from "../../Core/Models/Abstract/IModel";

export default interface ILibrary extends IModel , Document{
    name:string,
    ownerId: Types.ObjectId | string,
    sizeGb:number,
    roles:{
        name:string
    }[],
    departments:{
        name:string
    }[]
}