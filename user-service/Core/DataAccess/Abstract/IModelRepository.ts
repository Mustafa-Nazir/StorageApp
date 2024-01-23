import IModel from "../../Models/Abstract/IModel";

export default interface IModelRepository<T extends IModel>{
    Add(model:T):Promise<string>;
    Update(model:T):Promise<void>;
    Delete(model:T):Promise<void>;
    Get(filter:any):Promise<T | null>;
    GetAll(filter?:any):Promise<T[]>;
}