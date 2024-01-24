import { inject, injectable } from "tsyringe";
import IAuthService from "../../../Business/Abstract/IAuthService";
import IUserForRegisterDto from "../../../Models/DTOs/IUserForRegisterDto";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import IUserForLoginDto from "../../../Models/DTOs/IUserForLoginDto";

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
}