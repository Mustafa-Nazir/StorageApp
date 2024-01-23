import { Document } from "mongoose";
import IModel from "../../Core/Models/Abstract/IModel";

export default interface IUser extends IModel , Document{
    email:string,
    password:string,
    name:string,
    surname:string,
}