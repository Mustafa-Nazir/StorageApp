import { inject, injectable } from "tsyringe";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IFolderDal from "../../DataAccess/Abstract/IFolderDal";
import IFolder from "../../Models/Abstract/IFolder";
import IFolderService from "../Abstract/IFolderService";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";

@injectable()
export default class FolderManager implements IFolderService{
    private _folderDal:IFolderDal;
    constructor(@inject("IFolderDal")folderDal:IFolderDal){
        this._folderDal = folderDal
    }
    public async Add(folder: IFolder): Promise<IDataResult<string>> {
        const data = await this._folderDal.Add(folder);
        return new SuccessDataResult<string>(data);
    }
    public async GetAllByCurrentFolderId(id: string): Promise<IDataResult<IFolder[]>> {
        const data = await this._folderDal.GetAll({currentFolderId:id});
        return new SuccessDataResult<IFolder[]>(data);
    }

}