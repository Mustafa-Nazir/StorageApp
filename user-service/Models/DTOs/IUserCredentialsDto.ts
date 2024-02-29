import IDto from "../../Core/Models/Abstract/IDto";
import IUserCredentials from "../../Core/Models/Abstract/IUserCredentials";

export default interface IUserCredentialsDto extends IUserCredentials , IDto{
    exp:number
}