import {container} from "tsyringe"
import IAuthService from "../../../Business/Abstract/IAuthService";
import IUserDal from "../../../DataAccess/Abstract/IUserDal";
import MsUserDal from "../../../DataAccess/Concrete/Mongoose/MsUserDal";
import IUserService from "../../../Business/Abstract/IUserService";
import UserManager from "../../../Business/Concrete/UserManager";
import AuthManager from "../../../Business/Concrete/AuthManager";
import AuthController from "../../Concrete/Controllers/AuthController";
import ILibraryDal from "../../../DataAccess/Abstract/ILibraryDal";
import MsLibraryDal from "../../../DataAccess/Concrete/Mongoose/MsLibraryDal";
import ILibraryService from "../../../Business/Abstract/ILibraryService";
import LibraryManager from "../../../Business/Concrete/LibraryManager";
import LibraryController from "../../Concrete/Controllers/LibraryController";

container.registerSingleton<IAuthService>("IAuthService", AuthManager);

container.registerSingleton<IUserDal>("IUserDal", MsUserDal);
container.registerSingleton<IUserService>("IUserService", UserManager);

container.registerSingleton<ILibraryDal>("ILibraryDal", MsLibraryDal);
container.registerSingleton<ILibraryService>("ILibraryService", LibraryManager);

container.registerSingleton(AuthController);
container.registerSingleton(LibraryController);

export {container};