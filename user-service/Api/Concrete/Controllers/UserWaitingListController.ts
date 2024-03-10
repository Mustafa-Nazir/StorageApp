import { inject, injectable } from "tsyringe";
import IUserWaitingListService from "../../../Business/Abstract/IUserWaitingListService";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import IUserWaitingList from "../../../Models/Abstract/IUserWaitingList";
import IUserService from "../../../Business/Abstract/IUserService";
import ILibraryService from "../../../Business/Abstract/ILibraryService";
import ILibrary from "../../../Models/Abstract/ILibrary";
import SuccessResult from "../../../Core/Utilities/Results/Concrete/SuccessResult";

@injectable()
export default class UserWaitingListController{
    private _userWaitingListService:IUserWaitingListService;
    private _userService:IUserService;
    private _libraryService:ILibraryService;
    constructor(
        @inject("IUserWaitingListService") userWaitingListService:IUserWaitingListService,
        @inject("IUserService")userService:IUserService,
        @inject("ILibraryService")libraryService:ILibraryService
        ){
        this._userWaitingListService = userWaitingListService;
        this._userService = userService;
        this._libraryService = libraryService;
    }

    public async AddUser(req:any , res:any){
        try {
            const user:IUserWaitingList = req.body;

            const resultForUser = await this._userService.GetByEmail(user.email);
            if(!resultForUser.success) return res.status(400).send(resultForUser);

            const userId:string = resultForUser.data?._id;
            const library:ILibrary = {
                _id:user.libraryId,
                users:[{userId:userId , roleId:user.roleId , departmentId:user.departmentId}]
            } as ILibrary
            const resultForLibrary = await this._libraryService.UserControl(library);
            if(!resultForLibrary.success) return res.status(400).send(resultForLibrary);

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

    public async GetRequestDto(req:any , res:any){
        try {
            const email = req.header("user-email");

            const result = await this._userWaitingListService.GetRequestsDtoByEmail(email);
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

            const resultForUser = await this._userService.GetByEmail(user.email);
            if(!resultForUser.success) return res.status(400).send(resultForUser);

            const userId:string = resultForUser.data?._id;
            const library:ILibrary = {
                _id:user.libraryId,
                users:[{userId:userId, roleId:user.roleId, departmentId:user.departmentId }]
            } as ILibrary

            const resultForLibrary = await this._libraryService.AddUser(library);
            if(!resultForLibrary.success) return res.status(400).send(resultForLibrary);

            await this._userWaitingListService.DeleteTheRequestById(user._id);
            return res.status(200).send(new SuccessResult());

        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }
}