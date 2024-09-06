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
import IUserCredentialsDto from "../../Models/DTOs/IUserCredentialsDto";
import jwt, { JwtPayload } from "jsonwebtoken";

@injectable()
export default class AuthManager implements IAuthService {
    private _userService: IUserService;

    constructor(@inject("IUserService") userService: IUserService) {
        this._userService = userService;
    }

    public TokenControl(token: string): IDataResult<IUserCredentialsDto> {
        try {
            const decodedToken: JwtPayload = jwt.decode(token) as JwtPayload;

            if (token && decodedToken) {
                const exp = decodedToken.exp !== undefined ? decodedToken.exp : 0;
                const second = Date.now() / 1000;

                if (exp < second) return new ErrorDataResult<IUserCredentialsDto>(undefined, "JWt expired");

                const secretToken: string = process.env.SECRET_TOKEN || "";
                const decodedData: JwtPayload = jwt.verify(token, secretToken) as JwtPayload;
                if (decodedData.email) return new SuccessDataResult<IUserCredentialsDto>({ email: decodedData.email, exp: exp });
            }

            return new ErrorDataResult<IUserCredentialsDto>(undefined, "Unauthorized");
        } catch (error) {
            return new ErrorDataResult<IUserCredentialsDto>(undefined, "Unauthorized");
        }

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
        return new SuccessResult("Registration process was successfully completed");
    }
    public async Login(userForLoginDto: IUserForLoginDto): Promise<IDataResult<IAccessToken>> {
        const result = await this._userService.GetByEmail(userForLoginDto.email);
        const errorMessage = "Email or password are incorrect";
        if (!result.success) return new ErrorDataResult<IAccessToken>(undefined, errorMessage);

        const passwordControl: boolean = await HashingHelper.VerifyPasswordHash(userForLoginDto.password, result.data?.password as string)
        if (!passwordControl) return new ErrorDataResult<IAccessToken>(undefined, errorMessage);

        const token = this.createAccessToken(result.data as IUser)
        return new SuccessDataResult<IAccessToken>(token);
    }

    private createAccessToken(user: IUser): IAccessToken {
        const userCredentials: IUserCredentials = {
            email: user.email
        }
        const token = JwtHelper.CreateToken(userCredentials);

        return token;
    }

}