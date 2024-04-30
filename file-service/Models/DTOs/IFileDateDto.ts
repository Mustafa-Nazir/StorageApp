import IDto from "../../Core/Models/Abstract/IDto";

export default interface IFileDateDto extends IDto{
    date:Date,
    amount:number
}