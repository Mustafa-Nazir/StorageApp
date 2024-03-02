import { inject, injectable } from "tsyringe";
import IUserService from "../../../Business/Abstract/IUserService";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import IUserInforDto from "../../../Models/DTOs/IUserInfoDto";
import SuccessDataResult from "../../../Core/Utilities/Results/Concrete/SuccessDataResult";

@injectable()
export default class UserController{
    private _userService:IUserService;

    constructor(@inject("IUserService")userService:IUserService) {
        this._userService = userService
    }

    public async GetUserInfo(req:any , res:any){
        try {
            const email = req.header("user-email");
            const result = await this._userService.GetByEmail(email);

            if(!result.success) return res.status(400).send(result);

            const data = result.data;
            const userInfo:IUserInforDto = {
                _id:data?._id,
                email:data?.email as string,
                name:data?.name as string,
                surname: data?.surname as string,
            } 

            return res.status(200).send(new SuccessDataResult<IUserInforDto>(userInfo));
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }
}