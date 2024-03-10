import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import IUserWaitingList from "../../../Models/Abstract/IUserWaitingList";
import { UserWaitingList } from "../../../Models/Concrete/UserWaitingList";
import IUserWaitingListDal from "../../Abstract/IUserWaitingListDal";
import IUserWaitingListDto from "../../../Models/DTOs/IUserWaitingListDto";

@injectable()
export default class MsUserWaitingListDal extends MsModelRepositoryBase<IUserWaitingList> implements IUserWaitingListDal{
    constructor() {
        super(UserWaitingList);
        
    }
    public async GetRequestDtoByEmail(email: string): Promise<IUserWaitingListDto[]> {
        const data:IUserWaitingListDto[] = await UserWaitingList.find({email:email}).populate("libraryId","_id name departments roles") as any;
        return data;
    }
}