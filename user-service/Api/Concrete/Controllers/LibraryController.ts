import { inject, injectable } from "tsyringe";
import ILibraryService from "../../../Business/Abstract/ILibraryService";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import ILibrary from "../../../Models/Abstract/ILibrary";
import IUserService from "../../../Business/Abstract/IUserService";

@injectable()
export default class LibraryController {
    private _libraryService:ILibraryService;
    private _userService:IUserService;

    constructor(
        @inject("ILibraryService")libraryService:ILibraryService,
        @inject("IUserService")userService:IUserService
        ){
        this._libraryService = libraryService;
        this._userService = userService;
    }

    public async Add(req:any , res:any){
        try {
            const data:ILibrary = req.body;
            const result = await this._libraryService.Add(data);

            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async AddDepartments(req:any , res:any){
        try {
            const data:ILibrary = req.body;
            const result = await this._libraryService.AddDepartment(data);

            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetAllByUserId(req:any , res:any){
        try {
            const email = req.header("user-email");
            const userId = (await this._userService.GetByEmail(email)).data?._id;
            const result = await this._libraryService.GetAllByUserId(userId);

            return res.status(200).send(result);

        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetDepartmentsAndRolesByLibraryId(req:any , res:any){
        try {
            const {id} = req.params;
            const result = await this._libraryService.GetDepartmentsAndRolesByLibraryId(id);

            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async UserControlByLibraryId(req:any , res:any){
        try {
            const {id} = req.params;
            const email = req.header("user-email");
            const userId = (await this._userService.GetByEmail(email)).data?._id;

            const result = await this._libraryService.IsUserInLibrary(id,userId);
            
            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetUserDepartmentAndRole(req:any , res:any){
        try {
            const {id} = req.params;
            const email = req.header("user-email");
            const userId = (await this._userService.GetByEmail(email)).data?._id;

            const result = await this._libraryService.GetUserDepartmentAndRole(id,userId);
            
            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetLibraryUsersById(req:any , res:any){
        try {
            const {id} = req.params;

            const result = await this._libraryService.GetLibraryUsersById(id);
            
            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetLibraryInfoById(req:any , res:any){
        try {
            const {id} = req.params;

            const result = await this._libraryService.GetLibraryInfoById(id);
            
            const status = result.success ? 200 : 400;
            return res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }
}