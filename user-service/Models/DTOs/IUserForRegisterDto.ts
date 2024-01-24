import IDto from "../../Core/Models/Abstract/IDto";

export default interface IUserForRegisterDto extends IDto {
    email: string;
    password: string;
    name: string;
    surname: string;
}