import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";
import IUserDal from "../../DataAccess/Abstract/IUserDal";
import IUser from "../../Models/Abstract/IUser";
import IUserService from "../Abstract/IUserService";

export default class UserManager implements IUserService{
    private _userDal : IUserDal;
    
    constructor(userDal:IUserDal){
        this._userDal = userDal;
    }

    public async Add(user: IUser): Promise<IResult> {
        await this._userDal.Add(user);
        return new SuccessResult();
    }
}