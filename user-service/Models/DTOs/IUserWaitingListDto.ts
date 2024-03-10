import IDto from "../../Core/Models/Abstract/IDto";
import ILibrary from "../Abstract/ILibrary";

export default interface IUserWaitingListDto extends IDto {
    _id?:string,
    email:string,
    libraryId:ILibrary
    roleId:string 
    departmentId:string 
}