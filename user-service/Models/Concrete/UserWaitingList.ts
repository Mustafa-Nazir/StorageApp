import { Schema, model } from "mongoose";
import IUserWaitingList from "../Abstract/IUserWaitingList";

const UserWaitingListSchema = new Schema<IUserWaitingList>({
    email:{type:String},
    libraryId:{type:Schema.Types.ObjectId , ref:"Library"},
    roleId:{type:Schema.Types.ObjectId , ref:"Library.roles"},
    departmentId:{type:Schema.Types.ObjectId , ref:"Library.departments"},
})

export const UserWaitingList = model<IUserWaitingList>("UserWaitingList",UserWaitingListSchema);