import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import ILibrary from "../../Models/Abstract/ILibrary";

export default interface ILibraryService{
    Add(library:ILibrary):Promise<IDataResult<string>>;
    GetByOwnerId(id:string):Promise<IDataResult<ILibrary>>;
    AddDepartment(library:ILibrary):Promise<IResult>;
    GetById(id:string):Promise<IDataResult<ILibrary>>;
    GetAllByUserId(id:string):Promise<IDataResult<ILibrary[]>>;
    GetDepartmentsAndRolesByLibraryId(id:string):Promise<IDataResult<ILibrary>>;
    AddUser(library:ILibrary):Promise<IResult>;
    UserControl(library:ILibrary):Promise<IResult>
}