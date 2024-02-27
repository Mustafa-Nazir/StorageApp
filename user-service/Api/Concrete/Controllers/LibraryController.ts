import { inject, injectable } from "tsyringe";
import ILibraryService from "../../../Business/Abstract/ILibraryService";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import ILibrary from "../../../Models/Abstract/ILibrary";

@injectable()
export default class LibraryController {
    private _libraryService:ILibraryService;

    constructor(@inject("ILibraryService")libraryService:ILibraryService){
        this._libraryService = libraryService;
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

}