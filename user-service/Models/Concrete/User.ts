import { Schema, model } from "mongoose";
import IUser from "../Abstract/IUser";

const UserSchema = new Schema<IUser>({
    email:{type:String},
    password:{type:String},
    name:{type:String},
    surname:{type:String},
});

export const User = model<IUser>("User",UserSchema);