import mongoose, { Model } from "mongoose";
import IModel from "../../../Models/Abstract/IModel";
import IModelRepository from "../../Abstract/IModelRepository";

export class MsModelRepositoryBase<
    TModel extends IModel & mongoose.Document
> implements IModelRepository<TModel>{
    schema: Model<TModel>;
    constructor(schema: Model<TModel>) {
        this.schema = schema;
    }
    async Add(model: TModel): Promise<string> {
        const addedModel = new this.schema(model);
        const savedModel = await addedModel.save();
        return savedModel._id;
    }
    async Update(model: Partial<TModel>): Promise<void> {
        await this.schema.findOneAndUpdate({ "_id": model._id }, model)
    }
    async Delete(model: TModel): Promise<void> {
        await this.schema.findByIdAndDelete(model._id);
    }
    async Get(filter: any): Promise<TModel | null> {
        return await this.schema.findOne(filter)
    }
    async GetAll(filter?: any): Promise<TModel[]> {
        return await this.schema.find(filter);
    }

}