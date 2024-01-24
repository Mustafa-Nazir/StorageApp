import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IUser from "../../Models/Abstract/IUser";

export default interface IUserService {
    Add(user: IUser): Promise<IResult>;
    GetByEmail(email:string):Promise<IDataResult<IUser>>;
}