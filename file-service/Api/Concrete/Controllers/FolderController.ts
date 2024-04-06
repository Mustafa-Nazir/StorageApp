import { inject, injectable } from "tsyringe";
import IFolderService from "../../../Business/Abstract/IFolderService";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import IFolder from "../../../Models/Abstract/IFolder";

@injectable()
export default class FolderController{
    private _folderService:IFolderService;
    constructor(@inject("IFolderService")folderService:IFolderService){
        this._folderService = folderService;
    }

    public async Add(req:any,res:any){
        try {
            const folder:IFolder = req.body;

            const result = await this._folderService.Add(folder);
            res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetAllByCurrentFolderId(req:any,res:any){
        try {
            const {id} = req.params;

            const result = await this._folderService.GetAllByCurrentFolderId(id);
            res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetFolderNameById(req:any,res:any){
        try {
            const {id} = req.params;

            const result = await this._folderService.GetFolderNameById(id);
            const status = result.success ? 200 : 400;
            res.status(status).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }
}