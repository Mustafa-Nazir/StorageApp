import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IFolder from "../../Models/Abstract/IFolder";

export default interface IFolderService{
    Add(folder:IFolder):Promise<IDataResult<string>>;
    GetAllByCurrentFolderId(id:string):Promise<IDataResult<IFolder[]>>;
    GetFolderNameById(id:string):Promise<IDataResult<string>>;
}