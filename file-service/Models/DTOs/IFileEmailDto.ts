import IDto from "../../Core/Models/Abstract/IDto";

export default interface IFileEmailDto extends IDto{
    email:string,
    amount:number,
    totalSize:number
}