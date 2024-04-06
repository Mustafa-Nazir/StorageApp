import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import ILibrary from "../../../Models/Abstract/ILibrary";
import { Library } from "../../../Models/Concrete/Library";
import ILibraryDal from "../../Abstract/ILibraryDal";
import ILibraryUsersDto from "../../../Models/DTOs/ILibraryUsersDto";
import ILibraryInfoDto from "../../../Models/DTOs/ILibraryInfoDto";

@injectable()
export default class MsLibraryDal extends MsModelRepositoryBase<ILibrary> implements ILibraryDal{
    constructor(){
        super(Library);
    }
    
    public async GetLibraryInfoById(id: string): Promise<ILibraryInfoDto> {
        const data = await Library.findOne({_id:id})
        .populate("ownerId","_id name surname email").select("_id name ownerId sizeGb") as any;
        return data;
    }
    
    public async GetLibraryUsersById(id:string): Promise<ILibraryUsersDto> {
        const data = await Library.findOne({_id:id})
        .populate("users.userId","_id name surname email").select("users") as any;
        return data;
    }
    
    public async AddUser(library: ILibrary): Promise<void> {
        const _library = await this.Get({_id:library._id});
        _library?.users.push(...library.users);
        await _library?.save(); 
    }

    public async AddDepartment(library: ILibrary): Promise<void> {
        const _library = await this.Get({_id:library._id});
        _library?.departments.push(...library.departments);
        await _library?.save();
    }
}