import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IFile from "../../Models/Abstract/IFile";

export default interface IFileService{
    Add(file:IFile):Promise<IDataResult<string>>;
    Delete(file:IFile):Promise<IResult>;
}