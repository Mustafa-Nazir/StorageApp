import IModelRepository from "../../Core/DataAccess/Abstract/IModelRepository";
import IUser from "../../Models/Abstract/IUser";

export default interface IUserDal extends IModelRepository<IUser> {
}