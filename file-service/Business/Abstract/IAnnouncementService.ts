import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IAnnouncement from "../../Models/Abstract/IAnnouncement";

export default interface IAnnouncementService {
    Add(announcement:IAnnouncement):Promise<IDataResult<string>>;
    GetAllByCategoryId(categoryId:string):Promise<IDataResult<IAnnouncement[]>>;
}