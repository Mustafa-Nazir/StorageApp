import IModelRepository from "../../Core/DataAccess/Abstract/IModelRepository";
import ILibrary from "../../Models/Abstract/ILibrary";
import ILibraryInfoDto from "../../Models/DTOs/ILibraryInfoDto";
import ILibraryUsersDto from "../../Models/DTOs/ILibraryUsersDto";

export default interface ILibraryDal extends IModelRepository<ILibrary> {
    AddDepartment(library:ILibrary):Promise<void>
    AddUser(library:ILibrary):Promise<void>
    GetLibraryUsersById(id:string):Promise<ILibraryUsersDto>
    GetLibraryInfoById(id:string):Promise<ILibraryInfoDto>
}