import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IAnnouncement from "../../Models/Abstract/IAnnouncement";

export default interface IAnnouncementService {
    Add(announcement:IAnnouncement):Promise<IDataResult<string>>;
    Delete(announcement:IAnnouncement):Promise<IResult>;
    GetAllByCategoryId(categoryId:string):Promise<IDataResult<IAnnouncement[]>>;
}