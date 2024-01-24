import { inject, injectable } from "tsyringe";
import IAccessToken from "../../Core/Models/Abstract/IAccessToken";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IUserForLoginDto from "../../Models/DTOs/IUserForLoginDto";
import IUserForRegisterDto from "../../Models/DTOs/IUserForRegisterDto";
import IAuthService from "../Abstract/IAuthService";
import IUserService from "../Abstract/IUserService";
import ErrorResult from "../../Core/Utilities/Results/Concrete/ErrorResult";
import HashingHelper from "../../Core/Utilities/Security/Hashing/HashingHelper";
import IUser from "../../Models/Abstract/IUser";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";
import ErrorDataResult from "../../Core/Utilities/Results/Concrete/ErrorDataResult";
import JwtHelper from "../../Core/Utilities/Security/JWT/JwtHelper";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";
import IUserCredentials from "../../Core/Models/Abstract/IUserCredentials";

@injectable()
export default class AuthManager implements IAuthService {
    private _userService: IUserService;

    constructor(@inject("IUserService") userService: IUserService) {
        this._userService = userService;
    }

    public async Register(userForRegisterDto: IUserForRegisterDto): Promise<IResult> {
        const result = await this._userService.GetByEmail(userForRegisterDto.email);
        if (result.success) return new ErrorResult(result.message);

        const hashedPassword = await HashingHelper.CreatePasswordHash(userForRegisterDto.password);
        const user: IUser = {
            email: userForRegisterDto.email,
            password: hashedPassword,
            name: userForRegisterDto.name,
            surname: userForRegisterDto.surname,
        } as IUser;

        await this._userService.Add(user);
        return new SuccessResult();
    }
    public async Login(userForLoginDto: IUserForLoginDto): Promise<IDataResult<IAccessToken>> {
        const result = await this._userService.GetByEmail(userForLoginDto.email);
        const errorMessage = "Email or password are incorrect";
        if (!result.success) return new ErrorDataResult<IAccessToken>(undefined, errorMessage);

        const passwordControl:boolean = await HashingHelper.VerifyPasswordHash(userForLoginDto.password , result.data?.password as string)
        if(!passwordControl) return new ErrorDataResult<IAccessToken>(undefined, errorMessage);

        const token = this.createAccessToken(result.data as IUser)
        return new SuccessDataResult<IAccessToken>(token);
    }

    private createAccessToken(user:IUser):IAccessToken{
        const userCredentials:IUserCredentials = {
            email:user.email
        }
        const token = JwtHelper.CreateToken(userCredentials);

        return token;
    }

}