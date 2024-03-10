import IModelRepository from "../../Core/DataAccess/Abstract/IModelRepository";
import IUserWaitingList from "../../Models/Abstract/IUserWaitingList";
import IUserWaitingListDto from "../../Models/DTOs/IUserWaitingListDto";

export default interface IUserWaitingListDal extends IModelRepository<IUserWaitingList> {
    GetRequestDtoByEmail(email:string):Promise<IUserWaitingListDto[]>;
}