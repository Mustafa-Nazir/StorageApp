import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import IAnnouncement from "../../../Models/Abstract/IAnnouncement";
import { Announcement } from "../../../Models/Concrete/Announcement";
import IAnnouncementDal from "../../Abstract/IAnnouncementDal";

@injectable()
export default class MsAnnouncementDal extends MsModelRepositoryBase<IAnnouncement> implements IAnnouncementDal{
    constructor(){
        super(Announcement);
    }
}