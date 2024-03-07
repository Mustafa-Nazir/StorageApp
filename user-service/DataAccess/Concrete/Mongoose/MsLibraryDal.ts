import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import ILibrary from "../../../Models/Abstract/ILibrary";
import { Library } from "../../../Models/Concrete/Library";
import ILibraryDal from "../../Abstract/ILibraryDal";

@injectable()
export default class MsLibraryDal extends MsModelRepositoryBase<ILibrary> implements ILibraryDal{
    constructor(){
        super(Library);
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