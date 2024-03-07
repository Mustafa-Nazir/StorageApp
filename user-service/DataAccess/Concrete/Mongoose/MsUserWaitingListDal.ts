import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import IUserWaitingList from "../../../Models/Abstract/IUserWaitingList";
import { UserWaitingList } from "../../../Models/Concrete/UserWaitingList";
import IUserWaitingListDal from "../../Abstract/IUserWaitingListDal";

@injectable()
export default class MsUserWaitingListDal extends MsModelRepositoryBase<IUserWaitingList> implements IUserWaitingListDal{
    constructor() {
        super(UserWaitingList);
        
    }
}