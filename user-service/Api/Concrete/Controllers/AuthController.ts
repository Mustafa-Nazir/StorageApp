import { inject, injectable } from "tsyringe";
import jwt, { JwtPayload } from "jsonwebtoken";
import IAuthService from "../../../Business/Abstract/IAuthService";
import IUserForRegisterDto from "../../../Models/DTOs/IUserForRegisterDto";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import IUserForLoginDto from "../../../Models/DTOs/IUserForLoginDto";
import SuccessDataResult from "../../../Core/Utilities/Results/Concrete/SuccessDataResult";
import IUserCredentialsDto from "../../../Models/DTOs/IUserCredentialsDto";

@injectable()
export default class AuthController {
    private _authService: IAuthService;

    constructor(@inject("IAuthService") authService: IAuthService) {
        this._authService = authService;
    }

    public async Register(req: any, res: any) {
        try {
            const data:IUserForRegisterDto = req.body;
            const result = await this._authService.Register(data);
            
            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async Login(req: any, res: any) {
        try {
            const data:IUserForLoginDto = req.body;
            const result = await this._authService.Login(data);

            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async TokenControl(req:any , res:any){
        try {
            const header = req.header('Authorization');
            const token = header ? header.split(" ")[1] : null;
            const decodedToken:JwtPayload = jwt.decode(token) as JwtPayload;
            
            if (token && decodedToken) {
                const exp = decodedToken.exp !== undefined ? decodedToken.exp : 0;
                const second = Date.now() / 1000;

                if (exp < second) return res.status(401).send(new ErrorDataResult<IUserCredentialsDto>(undefined,"JWt expired"));

                const secretToken:string = process.env.SECRET_TOKEN || "";
                const decodedData:JwtPayload = jwt.verify(token, secretToken) as JwtPayload;
                if (decodedData.email) return res.status(200).send(new SuccessDataResult<IUserCredentialsDto>({email:decodedData.email,exp:exp}));
            }
            res.status(401).send(new ErrorDataResult<IUserCredentialsDto>(undefined,"Unauthorized"));
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }
}