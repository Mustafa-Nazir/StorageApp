import IDto from "../../Core/Models/Abstract/IDto";

export default interface IFileDto extends IDto{
    _id:string,
    name:string,
    email:string,
    url:string,
    folderId:string,
    libraryId:string,
    departmentId:string,
    date:Date,
    encrypted:boolean,
    size:number
} 