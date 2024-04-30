import IModelRepository from "../../Core/DataAccess/Abstract/IModelRepository";
import IFile from "../../Models/Abstract/IFile";
import IFileDateDto from "../../Models/DTOs/IFileDateDto";
import IFileDepartmentDto from "../../Models/DTOs/IFileDepartmentDto";
import IFileDto from "../../Models/DTOs/IFileDto";
import IFileEmailDto from "../../Models/DTOs/IFileEmailDto";

export default interface IFileDal extends IModelRepository<IFile>{
    GetAllByFolderIdDto(id:string):Promise<IFileDto[]>;
    GetTotalSizeByLibraryId(id:string):Promise<number>;
    GetTotalSizeAccordingToEmail(libraryId:string):Promise<IFileEmailDto[]>;
    GetTotalSizeAccordingToDepartment(libraryId:string):Promise<IFileDepartmentDto[]>;
    GetAmountAccordingToDate(libraryId:string):Promise<IFileDateDto[]>;
}