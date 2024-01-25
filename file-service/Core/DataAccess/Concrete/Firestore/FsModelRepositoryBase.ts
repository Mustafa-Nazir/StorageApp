import IFsModel from "../../../Models/Abstract/Firestore/IFsModel";
import IModel from "../../../Models/Abstract/IModel";
import IModelRepository from "../../Abstract/IModelRepository";
import admin from "firebase-admin";

export class FsModelRepositoryBase<
    TModel extends IModel,
    TFsModel extends IFsModel<TModel>
> implements IModelRepository<TFsModel>{
    collection: string
    db: admin.firestore.Firestore
    constructor(collection: string , db: admin.firestore.Firestore) {
        this.collection = collection;
        this.db = db;
    }
    async Add(model: TFsModel): Promise<string> {
        const docRef = await this.db.collection(this.collection).add(model.data);
        return docRef.id;
    }
    async Update(model: Partial<TFsModel>): Promise<void> {
        const docRef = this.db.collection(this.collection).doc(model.id as string);
        await docRef.update(model.data as any)
    }
    async Delete(model: TFsModel): Promise<void> {
        const docRef = this.db.collection(this.collection).doc(model.id as string);
        await docRef.delete();
    }
    async Get(filter: any): Promise<TFsModel | null> {
        const collectionRef = this.db.collection(this.collection);
        if(filter[0] == "id"){
            const snapshot = await collectionRef.doc(filter[2]).get()
            return snapshot.exists ? {id:snapshot.id , data:snapshot.data()}  as any : null;
        } 
        const snapshot = await collectionRef.where(filter[0] , filter[1] , filter[2]).limit(1).get();
        const doc = snapshot.docs[0]
        return snapshot.empty ? null : {id:doc.id , data:doc.data()} as any;
    }
    async GetAll(filter?: any): Promise<TFsModel[]> {
        const collectionRef = this.db.collection(this.collection);
        const snapshot = filter ? await collectionRef.where(filter[0] , filter[1] , filter[2]).get() : await collectionRef.get();
        const docs = snapshot.docs;
        return docs.map(doc =>{
            return {
                id:doc.id,
                data:doc.data()
            } as any;
        });
    }

}