import { inject, injectable } from "tsyringe";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";
import IUserDal from "../../DataAccess/Abstract/IUserDal";
import IUser from "../../Models/Abstract/IUser";
import IUserService from "../Abstract/IUserService";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";
import ErrorDataResult from "../../Core/Utilities/Results/Concrete/ErrorDataResult";

@injectable()
export default class UserManager implements IUserService {
    private _userDal: IUserDal;

    constructor(@inject("IUserDal") userDal: IUserDal) {
        this._userDal = userDal;
    }

    public async Add(user: IUser): Promise<IResult> {
        await this._userDal.Add(user);
        return new SuccessResult();
    }

    public async GetByEmail(email: string): Promise<IDataResult<IUser>> {
        const data = await this._userDal.Get({ email: email });
        if(data == null) return new ErrorDataResult<IUser>(undefined,"User is not found"); 
        return new SuccessDataResult<IUser>(data,"User is found");
    }
}