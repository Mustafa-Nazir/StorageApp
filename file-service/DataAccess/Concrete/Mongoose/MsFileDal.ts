import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import IFile from "../../../Models/Abstract/IFile";
import { File } from "../../../Models/Concrete/File";
import IFileDal from "../../Abstract/IFileDal";

@injectable()
export default class MsFileDal extends MsModelRepositoryBase<IFile> implements IFileDal{
    constructor(){
        super(File)
    }
}