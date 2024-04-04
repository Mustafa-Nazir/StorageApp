import IModelRepository from "../../Core/DataAccess/Abstract/IModelRepository";
import IAnnouncement from "../../Models/Abstract/IAnnouncement";

export default interface IAnnouncementDal extends IModelRepository<IAnnouncement>{
    
}