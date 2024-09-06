import IAccessToken from "../../Core/Models/Abstract/IAccessToken";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IUserCredentialsDto from "../../Models/DTOs/IUserCredentialsDto";
import IUserForLoginDto from "../../Models/DTOs/IUserForLoginDto";
import IUserForRegisterDto from "../../Models/DTOs/IUserForRegisterDto";

export default interface IAuthService {
    Register(userForRegisterDto: IUserForRegisterDto): Promise<IResult>;
    Login(userForLoginDto: IUserForLoginDto): Promise<IDataResult<IAccessToken>>;
    TokenControl(token:string): IDataResult<IUserCredentialsDto>
  }