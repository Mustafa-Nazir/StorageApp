import { inject, injectable } from "tsyringe";
import IUserWaitingListService from "../../../Business/Abstract/IUserWaitingListService";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import IUserWaitingList from "../../../Models/Abstract/IUserWaitingList";

@injectable()
export default class UserWaitingListController{
    private _userWaitingListService:IUserWaitingListService;
    constructor(@inject("IUserWaitingListService") userWaitingListService:IUserWaitingListService){
        this._userWaitingListService = userWaitingListService;
    }

    public async AddUser(req:any , res:any){
        try {
            const user:IUserWaitingList = req.body;

            const result = await this._userWaitingListService.AddUser(user);
            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetRequest(req:any , res:any){
        try {
            const email = req.header("user-email");

            const result = await this._userWaitingListService.GetRequestsByEmail(email);
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async RejectRequest(req:any , res:any){
        try {
            const user:IUserWaitingList = req.body;

            const result = await this._userWaitingListService.DeleteTheRequestById(user._id);
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async AcceptRequest(req:any , res:any){
        try {
            const user:IUserWaitingList = req.body;


        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }
}