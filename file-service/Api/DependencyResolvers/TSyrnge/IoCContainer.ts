import {container} from "tsyringe"
import IAnnouncementDal from "../../../DataAccess/Abstract/IAnnouncementDal";
import MsAnnouncementDal from "../../../DataAccess/Concrete/Mongoose/MsAnnouncementDal";
import IAnnouncementService from "../../../Business/Abstract/IAnnouncementService";
import AnnouncementManager from "../../../Business/Concrete/AnnouncementManager";
import AnnouncementController from "../../Concrete/Controllers/AnnouncementController";
import IFolderDal from "../../../DataAccess/Abstract/IFolderDal";
import MsFolderDal from "../../../DataAccess/Concrete/Mongoose/MsFolderDal";
import IFolderService from "../../../Business/Abstract/IFolderService";
import FolderManager from "../../../Business/Concrete/FolderManager";
import FolderController from "../../Concrete/Controllers/FolderController";
import IFileDal from "../../../DataAccess/Abstract/IFileDal";
import MsFileDal from "../../../DataAccess/Concrete/Mongoose/MsFileDal";
import IFileService from "../../../Business/Abstract/IFileService";
import FileManager from "../../../Business/Concrete/FileManager";
import FileController from "../../Concrete/Controllers/FileController";

container.registerSingleton<IAnnouncementDal>("IAnnouncementDal",MsAnnouncementDal);
container.registerSingleton<IAnnouncementService>("IAnnouncementService",AnnouncementManager);

container.registerSingleton<IFolderDal>("IFolderDal",MsFolderDal);
container.registerSingleton<IFolderService>("IFolderService",FolderManager);

container.registerSingleton<IFileDal>("IFileDal",MsFileDal);
container.registerSingleton<IFileService>("IFileService",FileManager);

container.registerSingleton(AnnouncementController);
container.registerSingleton(FolderController);
container.registerSingleton(FileController);

export {container};