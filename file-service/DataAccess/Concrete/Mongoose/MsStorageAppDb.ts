import mongoose from "mongoose";

export default class MsStorageAppDb {
    
    public static DbConnect(){
        mongoose.connect(process.env.MONGO_URI || "").then(()=>{
            console.log("mongoDB connected")
        }).catch((err)=>{
            console.log(err);
        })
    }
}