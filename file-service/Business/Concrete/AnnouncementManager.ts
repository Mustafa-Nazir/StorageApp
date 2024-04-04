import { inject, injectable } from "tsyringe";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IAnnouncement from "../../Models/Abstract/IAnnouncement";
import IAnnouncementService from "../Abstract/IAnnouncementService";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";
import IAnnouncementDal from "../../DataAccess/Abstract/IAnnouncementDal";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";

@injectable()
export default class AnnouncementManager implements IAnnouncementService{
    private _annoncementDal:IAnnouncementDal;

    constructor(@inject("IAnnouncementDal")annoncementDal:IAnnouncementDal){
        this._annoncementDal = annoncementDal;
    }

    public async Delete(announcement:IAnnouncement): Promise<IResult> {
        await this._annoncementDal.Delete(announcement);
        return new SuccessResult("The Announcement was successfully deleted")
    }

    public async Add(announcement: IAnnouncement): Promise<IDataResult<string>> {
        const id = await this._annoncementDal.Add(announcement);
        return new SuccessDataResult<string>(id,"The Announcement was successfully added");
    }

    public async GetAllByCategoryId(categoryId: string): Promise<IDataResult<IAnnouncement[]>> {
        const data = await this._annoncementDal.GetAll({categoryId:categoryId});
        return new SuccessDataResult<IAnnouncement[]>(data);
    }

}