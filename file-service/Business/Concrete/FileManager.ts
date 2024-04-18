import { inject, injectable } from "tsyringe";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IFile from "../../Models/Abstract/IFile";
import IFileService from "../Abstract/IFileService";
import IFileDal from "../../DataAccess/Abstract/IFileDal";
import HashingHelper from "../../Core/Utilities/Security/Hashing/HashingHelper";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";

@injectable()
export default class FileManager implements IFileService{
    private _fileDal:IFileDal;

    constructor(@inject("IFileDal")fileDal:IFileDal){
        this._fileDal = fileDal;
    }

    public async Add(file: IFile): Promise<IDataResult<string>> {
        if(file.password != null){
            const password = await this.createPassword(file.password);
            file.password = password;
        }
        const data = await this._fileDal.Add(file)
        return new SuccessDataResult<string>(data);
    }

    public async Delete(file: IFile): Promise<IResult> {
        await this._fileDal.Delete(file);
        return new SuccessResult("The file was successfully deleted");
    }

    private async createPassword(password:string):Promise<string>{
        const hashedPassword = HashingHelper.CreatePasswordHash(password);
        return hashedPassword;
    }

}