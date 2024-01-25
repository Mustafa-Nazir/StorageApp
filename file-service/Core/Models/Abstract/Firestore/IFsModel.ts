import admin from "firebase-admin";
import IModel from "../IModel";

export default interface IFsModel<T extends IModel & admin.firestore.DocumentData> extends IModel{
    id?:string,
    data:T;
}