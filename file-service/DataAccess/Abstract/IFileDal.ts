import IModelRepository from "../../Core/DataAccess/Abstract/IModelRepository";
import IFile from "../../Models/Abstract/IFile";
import IFileDto from "../../Models/DTOs/IFileDto";

export default interface IFileDal extends IModelRepository<IFile>{
    GetAllByFolderIdDto(id:string):Promise<IFileDto[]>;
    GetTotalSizeByLibraryId(id:string):Promise<number>;
}