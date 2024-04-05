import { inject, injectable } from "tsyringe";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IFolderDal from "../../DataAccess/Abstract/IFolderDal";
import IFolder from "../../Models/Abstract/IFolder";
import IFolderService from "../Abstract/IFolderService";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";
import ErrorResult from "../../Core/Utilities/Results/Concrete/ErrorResult";

@injectable()
export default class FolderManager implements IFolderService{
    private _folderDal:IFolderDal;
    constructor(@inject("IFolderDal")folderDal:IFolderDal){
        this._folderDal = folderDal
    }
    public async Add(folder: IFolder): Promise<IDataResult<string>> {
        const result = await this.folderNameControl(folder);
        if(!result.success) return result;
        
        const data = await this._folderDal.Add(folder);
        return new SuccessDataResult<string>(data ,"The folder was successfully added");
    }
    public async GetAllByCurrentFolderId(id: string): Promise<IDataResult<IFolder[]>> {
        const data = await this._folderDal.GetAll({currentFolderId:id});
        return new SuccessDataResult<IFolder[]>(data);
    }
    
    private async folderNameControl(folder:IFolder):Promise<IResult>{
        const data = await this._folderDal.Get({name:folder.name , currentFolderId:folder.currentFolderId});
        if(data == null) return new SuccessResult();
        return new ErrorResult("Folder name must be different from other folder names")
    }

}