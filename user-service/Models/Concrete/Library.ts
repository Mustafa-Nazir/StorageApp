import { Schema, model } from "mongoose";
import ILibrary from "../Abstract/ILibrary";

const LibrarySchema = new Schema<ILibrary>({
    name:{type:String},
    ownerId:{type:Schema.Types.ObjectId , ref:"User"},
    sizeGb:{type:Number},
    roles:{
        type:[{
            name:{type:String}
        }],
        default:[{name:"owner"},{name:"admin"},{name:"user"}]
    } ,
    departments:[{
        name:{type:String}
    }],
    users:[{
        userId:{type:Schema.Types.ObjectId , ref:"User"},
        roleId:{type:Schema.Types.ObjectId , ref:"Library.roles"},
        departmentId:{type:Schema.Types.ObjectId , ref:"Library.departments"},
    }]
});

export const Library = model<ILibrary>("Library",LibrarySchema);