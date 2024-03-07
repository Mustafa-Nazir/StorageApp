import IModelRepository from "../../Core/DataAccess/Abstract/IModelRepository";
import IUserWaitingList from "../../Models/Abstract/IUserWaitingList";

export default interface IUserWaitingListDal extends IModelRepository<IUserWaitingList> {
}