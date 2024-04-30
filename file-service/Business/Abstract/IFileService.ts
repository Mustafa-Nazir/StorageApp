import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IFile from "../../Models/Abstract/IFile";
import IFileDateDto from "../../Models/DTOs/IFileDateDto";
import IFileDepartmentDto from "../../Models/DTOs/IFileDepartmentDto";
import IFileDto from "../../Models/DTOs/IFileDto";
import IFileEmailDto from "../../Models/DTOs/IFileEmailDto";

export default interface IFileService{
    Add(file:IFile):Promise<IDataResult<IFileDto>>;
    Delete(file:IFile):Promise<IResult>;
    GetAllByFolderIdDto(id:string):Promise<IDataResult<IFileDto[]>>;
    GetByLibraryIdFolderIdAndName(libraryId:string,folderId:string,name:string):Promise<IDataResult<IFile>>;
    GetById(id:string):Promise<IDataResult<IFile>>;
    GetTotalSizeByLibraryId(id:string):Promise<IDataResult<number>>;
    LibraryEmptySizeControl(libraryId:string,size:number):Promise<IResult>;
    GetTotalSizeAccordingToEmail(libraryId:string):Promise<IDataResult<IFileEmailDto[]>>;
    GetTotalSizeAccordingToDepartment(libraryId:string):Promise<IDataResult<IFileDepartmentDto[]>>;
    GetAmountAccordingToDate(libraryId:string):Promise<IDataResult<IFileDateDto[]>>;
}