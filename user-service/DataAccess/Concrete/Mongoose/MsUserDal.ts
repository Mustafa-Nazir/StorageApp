import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import IUser from "../../../Models/Abstract/IUser";
import { User } from "../../../Models/Concrete/User";
import IUserDal from "../../Abstract/IUserDal";

@injectable()
export default class MsUserDal extends MsModelRepositoryBase<IUser> implements IUserDal {
    constructor() {
        super(User);
    }
}