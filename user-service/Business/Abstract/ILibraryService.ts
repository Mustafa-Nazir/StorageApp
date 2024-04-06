import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import ILibrary from "../../Models/Abstract/ILibrary";
import ILibraryInfoDto from "../../Models/DTOs/ILibraryInfoDto";
import ILibraryUsersDto from "../../Models/DTOs/ILibraryUsersDto";
import IUserLibraryDto from "../../Models/DTOs/IUserLibraryDto";

export default interface ILibraryService{
    Add(library:ILibrary):Promise<IDataResult<string>>;
    GetByOwnerId(id:string):Promise<IDataResult<ILibrary>>;
    AddDepartment(library:ILibrary):Promise<IResult>;
    GetById(id:string):Promise<IDataResult<ILibrary>>;
    GetAllByUserId(id:string):Promise<IDataResult<ILibrary[]>>;
    GetDepartmentsAndRolesByLibraryId(id:string):Promise<IDataResult<ILibrary>>;
    AddUser(library:ILibrary):Promise<IResult>;
    UserControl(library:ILibrary):Promise<IResult>
    IsUserInLibrary(libraryId:string , userId:string):Promise<IResult>;
    GetUserDepartmentAndRole(libraryId:string,userId:string):Promise<IDataResult<IUserLibraryDto>>;
    GetLibraryUsersById(id:string):Promise<IDataResult<ILibraryUsersDto>>;
    GetLibraryInfoById(id:string):Promise<IDataResult<ILibraryInfoDto>>;
}