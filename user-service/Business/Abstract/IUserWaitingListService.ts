import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IUserWaitingList from "../../Models/Abstract/IUserWaitingList";
import IUserWaitingListDto from "../../Models/DTOs/IUserWaitingListDto";

export default interface IUserWaitingListService{
    AddUser(user:IUserWaitingList):Promise<IResult>;
    DeleteTheRequestById(id:string):Promise<IResult>;
    GetRequestsByEmail(email:string):Promise<IDataResult<IUserWaitingList[]>>;
    GetRequestsDtoByEmail(email:string):Promise<IDataResult<IUserWaitingListDto[]>>;
}