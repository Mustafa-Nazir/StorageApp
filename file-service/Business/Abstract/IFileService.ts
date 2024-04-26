import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IFile from "../../Models/Abstract/IFile";
import IFileDto from "../../Models/DTOs/IFileDto";

export default interface IFileService{
    Add(file:IFile):Promise<IDataResult<IFileDto>>;
    Delete(file:IFile):Promise<IResult>;
    GetAllByFolderIdDto(id:string):Promise<IDataResult<IFileDto[]>>;
    GetByLibraryIdFolderIdAndName(libraryId:string,folderId:string,name:string):Promise<IDataResult<IFile>>;
    GetById(id:string):Promise<IDataResult<IFile>>;
}