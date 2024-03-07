import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IUserWaitingList from "../../Models/Abstract/IUserWaitingList";

export default interface IUserWaitingListService{
    AddUser(user:IUserWaitingList):Promise<IResult>;
    DeleteTheRequestById(id:string):Promise<IResult>;
    GetRequestsByEmail(email:string):Promise<IDataResult<IUserWaitingList[]>>;
}