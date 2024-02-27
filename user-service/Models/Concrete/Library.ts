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
    }]
});

export const Library = model<ILibrary>("Library",LibrarySchema);