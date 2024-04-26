import { inject, injectable } from "tsyringe";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IFile from "../../Models/Abstract/IFile";
import IFileService from "../Abstract/IFileService";
import IFileDal from "../../DataAccess/Abstract/IFileDal";
import HashingHelper from "../../Core/Utilities/Security/Hashing/HashingHelper";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";
import IFileDto from "../../Models/DTOs/IFileDto";
import ErrorDataResult from "../../Core/Utilities/Results/Concrete/ErrorDataResult";

@injectable()
export default class FileManager implements IFileService{
    private _fileDal:IFileDal;

    constructor(@inject("IFileDal")fileDal:IFileDal){
        this._fileDal = fileDal;
    }
    
    public async GetById(id: string): Promise<IDataResult<IFile>> {
        const data = await this._fileDal.Get({_id:id});
        if(data == null) return new ErrorDataResult<IFile>(undefined,"The file is not found");
        return new SuccessDataResult<IFile>(data);
    }
    
    public async GetByLibraryIdFolderIdAndName(libraryId: string, folderId: string, name: string): Promise<IDataResult<IFile>> {
        const data = await this._fileDal.Get({libraryId:libraryId , folderId:folderId , name:name});
        if(data == null) return new ErrorDataResult<IFile>(undefined);
        return new SuccessDataResult<IFile>(data);
    }
    
    public async GetAllByFolderIdDto(id: string): Promise<IDataResult<IFileDto[]>> {
        const data = await this._fileDal.GetAllByFolderIdDto(id);
        return new SuccessDataResult(data);
    }

    public async Add(file: IFile): Promise<IDataResult<IFileDto>> {
        if(file.password.length > 0){
            const password = await this.createPassword(file.password);
            file.password = password;
        }
        const data = await this._fileDal.Add(file)
        file._id = data;
        const fileDto:IFileDto = this.getFileDto(file);
        return new SuccessDataResult<IFileDto>(fileDto,"The file was successfully uploaded");
    }

    public async Delete(file: IFile): Promise<IResult> {
        await this._fileDal.Delete(file);
        return new SuccessResult("The file was successfully deleted");
    }

    private async createPassword(password:string):Promise<string>{
        const hashedPassword = HashingHelper.CreatePasswordHash(password);
        return hashedPassword;
    }

    private getFileDto(file:IFile):IFileDto{
        return {
            _id:file._id,
            departmentId:file.departmentId.toString(),
            date:file.date || new Date(),
            email:file.email,
            folderId:file.folderId.toString(),
            libraryId:file.libraryId.toString(),
            name:file.name,
            encrypted: file.password == "" ? false : true, 
            url: file.password == "" ? file.url : "" 
        }
    }

}