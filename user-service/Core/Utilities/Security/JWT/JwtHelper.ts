import jwt from "jsonwebtoken";
import IUserCredentials from "../../../Models/Abstract/IUserCredentials";
import IAccessToken from "../../../Models/Abstract/IAccessToken";
import IResult from "../../Results/Abstract/IResult";
import ErrorResult from "../../Results/Concrete/ErrorResult";
import SuccessResult from "../../Results/Concrete/SuccessResult";

export default class JwtHelper{
    static CreateToken(userCredentials: IUserCredentials): IAccessToken {
        const expires = Number(process.env.TOKEN_EXPIRES) || 12;
        const expiresJWT = expires.toString()+"h";
        const expiresTime = Date.now() + (expires * 60 * 60 * 1000);
        const secretToken = process.env.SECRET_TOKEN || ""; 
        const userToken = jwt.sign({...userCredentials},secretToken,{expiresIn:expiresJWT});
        return {
            expiration: new Date(expiresTime),
            token : userToken
        }
    }

    static ControlToken(accessToken:IAccessToken):IResult{
        const decodedToken = jwt.decode(accessToken.token);
        if(accessToken.token && decodedToken){
            if (accessToken.expiration.getTime() < Date.now()/1000){
                return new ErrorResult("JWT was expired");
            }
            const decodedData:IUserCredentials = jwt.verify(accessToken.token, process.env.SECRET_TOKEN || "") as IUserCredentials;
            if (decodedData.email) return new SuccessResult()
        }
        return new ErrorResult("Unauthorized");
    }

}