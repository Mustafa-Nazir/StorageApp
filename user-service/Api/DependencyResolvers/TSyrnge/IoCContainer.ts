import {container} from "tsyringe"
import IAuthService from "../../../Business/Abstract/IAuthService";
import IUserDal from "../../../DataAccess/Abstract/IUserDal";
import MsUserDal from "../../../DataAccess/Concrete/Mongoose/MsUserDal";
import IUserService from "../../../Business/Abstract/IUserService";
import UserManager from "../../../Business/Concrete/UserManager";
import AuthManager from "../../../Business/Concrete/AuthManager";
import AuthController from "../../Concrete/Controllers/AuthController";

container.registerSingleton<IAuthService>("IAuthService", AuthManager);

container.registerSingleton<IUserDal>("IUserDal", MsUserDal);
container.registerSingleton<IUserService>("IUserService", UserManager);

container.registerSingleton(AuthController);

export {container};