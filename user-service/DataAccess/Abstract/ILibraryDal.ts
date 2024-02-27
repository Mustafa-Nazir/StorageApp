import IModelRepository from "../../Core/DataAccess/Abstract/IModelRepository";
import ILibrary from "../../Models/Abstract/ILibrary";

export default interface ILibraryDal extends IModelRepository<ILibrary> {
    AddDepartment(library:ILibrary):Promise<void>
}