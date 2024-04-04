import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import IFolder from "../../../Models/Abstract/IFolder";
import IFolderDal from "../../Abstract/IFolderDal";
import { Folder } from "../../../Models/Concrete/Folder";

@injectable()
export default class MsFolderDal extends MsModelRepositoryBase<IFolder> implements IFolderDal{
    constructor(){
        super(Folder);
    }
}