import { inject, injectable } from "tsyringe";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IAnnouncement from "../../Models/Abstract/IAnnouncement";
import IAnnouncementService from "../Abstract/IAnnouncementService";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";
import IAnnouncementDal from "../../DataAccess/Abstract/IAnnouncementDal";

@injectable()
export default class AnnouncementManager implements IAnnouncementService{
    private _annoncementService:IAnnouncementDal;

    constructor(@inject("IAnnouncementDal")annoncementService:IAnnouncementDal){
        this._annoncementService = annoncementService;
    }

    public async Add(announcement: IAnnouncement): Promise<IDataResult<string>> {
        const id = await this._annoncementService.Add(announcement);
        return new SuccessDataResult<string>(id,"The Announcement was successfully added");
    }

    public async GetAllByCategoryId(categoryId: string): Promise<IDataResult<IAnnouncement[]>> {
        const data = await this._annoncementService.GetAll({categoryId:categoryId});
        return new SuccessDataResult<IAnnouncement[]>(data);
    }

}