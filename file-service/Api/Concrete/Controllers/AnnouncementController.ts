import { inject, injectable } from "tsyringe";
import IAnnouncementService from "../../../Business/Abstract/IAnnouncementService";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import IAnnouncement from "../../../Models/Abstract/IAnnouncement";

@injectable()
export default class AnnouncementController{
    private _announcementService:IAnnouncementService;

    constructor(@inject("IAnnouncementService")announcementService:IAnnouncementService){
        this._announcementService = announcementService;
    }

    public async Add(req:any , res:any){
        try {
            const announcement:IAnnouncement = req.body;

            const result = await this._announcementService.Add(announcement);
            res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async DeleteById(req:any , res:any){
        try {
            const {id} = req.params;
            const announcement:IAnnouncement = {_id:id} as IAnnouncement

            const result = await this._announcementService.Delete(announcement);
            res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetAllByCategoryId(req:any , res:any){
        try {
            const {categoryId} = req.params;

            const result = await this._announcementService.GetAllByCategoryId(categoryId);
            res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }
}