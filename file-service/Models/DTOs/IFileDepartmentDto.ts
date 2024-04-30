import IDto from "../../Core/Models/Abstract/IDto";

export default interface IFileDepartmentDto extends IDto{
    departmentId:string,
    amount:number,
    totalSize:number
}