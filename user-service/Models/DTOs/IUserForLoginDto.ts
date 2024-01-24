import IDto from "../../Core/Models/Abstract/IDto";

export default interface IUserForLoginDto extends IDto{
    email:string,
    password:string,
}