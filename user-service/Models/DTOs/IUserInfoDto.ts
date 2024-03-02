import IDto from "../../Core/Models/Abstract/IDto";

export default interface IUserInforDto extends IDto {
    _id:string;
    email: string;
    name: string;
    surname: string;
}