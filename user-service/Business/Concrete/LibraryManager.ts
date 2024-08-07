import { inject, injectable } from "tsyringe";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import ILibraryDal from "../../DataAccess/Abstract/ILibraryDal";
import ILibrary from "../../Models/Abstract/ILibrary";
import ILibraryService from "../Abstract/ILibraryService";
import ErrorDataResult from "../../Core/Utilities/Results/Concrete/ErrorDataResult";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import ErrorResult from "../../Core/Utilities/Results/Concrete/ErrorResult";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";
import IUserLibraryDto from "../../Models/DTOs/IUserLibraryDto";
import ILibraryUsersDto from "../../Models/DTOs/ILibraryUsersDto";
import ILibraryInfoDto from "../../Models/DTOs/ILibraryInfoDto";

@injectable()
export default class LibraryManager implements ILibraryService{
    private _libraryDal:ILibraryDal;

    constructor(@inject("ILibraryDal")libraryDal:ILibraryDal) {
        this._libraryDal = libraryDal;
    }
    
    public async GetLibraryInfoById(id: string): Promise<IDataResult<ILibraryInfoDto>> {
        const data = await this._libraryDal.GetLibraryInfoById(id);
        return new SuccessDataResult<ILibraryInfoDto>(data);
    }
    
    public async GetLibraryUsersById(id: string): Promise<IDataResult<ILibraryUsersDto>> {
        const data = await this._libraryDal.GetLibraryUsersById(id);
        return new SuccessDataResult<ILibraryUsersDto>(data);
    }
    
    public async GetUserDepartmentAndRole(libraryId:string,userId:string): Promise<IDataResult<IUserLibraryDto>> {
        const result = await this.GetById(libraryId);
        if(!result.success) return new ErrorDataResult<IUserLibraryDto>(undefined,result.message);

        const library = result.data;
        if (
            library?.ownerId.toString() == userId
        ){
            const owner = library?.roles.find(r => r.name == "owner");
            const data:IUserLibraryDto = {
                role:owner as any,
                departments:library.departments as any
            }

            return new SuccessDataResult<IUserLibraryDto>(data);
        }

        const userInfo = library?.users.find(u => u.userId.toString() == userId );
        const role = library?.roles.find(r => r._id?.toString() == userInfo?.roleId);
        const department = library?.departments.find(d => d._id?.toString() == userInfo?.departmentId);

        const data:IUserLibraryDto = {
            role:role as any,
            departments:[department as any],
        }

        return new SuccessDataResult<IUserLibraryDto>(data);
    }
    
    public async IsUserInLibrary(libraryId:string , userId:string): Promise<IResult> {
        const library = (await this.GetById(libraryId)).data;
        if (
            library?.ownerId.toString() == userId || 
            library?.users.some(u => u.userId.toString() == userId)
        ) return new SuccessResult();
        
        return new ErrorResult();
    }
    
    public async AddUser(library: ILibrary): Promise<IResult> {
        const result = await this.UserControl(library);
        if(!result.success) return result;

        await this._libraryDal.AddUser(library);
        return new SuccessResult("Users are added");
    }
    
    public async GetDepartmentsAndRolesByLibraryId(id: string): Promise<IDataResult<ILibrary>> {
        const data = await this._libraryDal.Get({_id:id});
        if(data == null) return new ErrorDataResult<ILibrary>(undefined,"The library is not found.");

        const rolesAndDepartments:ILibrary = {
            roles:data.roles,
            departments:data.departments
        } as ILibrary

        return new SuccessDataResult<ILibrary>(rolesAndDepartments);
    }
    
    public async GetAllByUserId(id: string): Promise<IDataResult<ILibrary[]>> {
        const data = await this._libraryDal.GetAll({'$or':[{ownerId:id},{"users.userId":id}]});
        return new SuccessDataResult<ILibrary[]>(data);
    }
    
    public async GetById(id: string): Promise<IDataResult<ILibrary>> {
        const data = await this._libraryDal.Get({_id:id});
        if(data == null) return new ErrorDataResult<ILibrary>(undefined,"The library is not found");
        return new SuccessDataResult<ILibrary>(data);
    }
    
    public async AddDepartment(library: ILibrary): Promise<IResult> {
        const result = await this.departmentControl(library);
        if(!result.success) return result;

        await this._libraryDal.AddDepartment(library);
        return new SuccessResult("The departments are successfully added");
    }

    public async Add(library: ILibrary): Promise<IDataResult<string>> {
        const result = await this.GetByOwnerId(library.ownerId as string);
        if(result.success) return new ErrorDataResult<string>(undefined,"An user can not create more than one library");
        
        const data = await this._libraryDal.Add(library);
        return new SuccessDataResult<string>(data);
    }
    
    public async GetByOwnerId(id: string): Promise<IDataResult<ILibrary>> {
        const data = await this._libraryDal.Get({ownerId:id});
        if(data == null) return new ErrorDataResult<ILibrary>(undefined,"The library is not found");
        return new SuccessDataResult<ILibrary>(data);
    }

    private async departmentControl(library:ILibrary):Promise<IResult>{
        const result = await this.GetById(library._id);
        if(!result.success) return new ErrorResult(result.message);

        const uniqueResult = this.uniqueDepartmentControl(result.data as ILibrary,library);
        if(!uniqueResult.success) return uniqueResult;

        return new SuccessResult();
    }

    private uniqueDepartmentControl(currentLibrary:ILibrary , newLibrary:ILibrary):IResult{
        const currentDepartments = currentLibrary.departments;
        const newDepartments = newLibrary.departments;

        let isExists:boolean = false;

        for (let i = 0; i < newDepartments.length; i++) {
            const newDep = newDepartments[i];
            isExists = currentDepartments.some(dep => dep.name == newDep.name);
            if(isExists) break;
        }
        
        return isExists ? new ErrorResult("New departments are not unique") : new SuccessResult();
    }

    public async UserControl(library:ILibrary):Promise<IResult>{
        const result = await this.GetById(library._id);
        if(!result.success) return new ErrorResult(result.message);

        const ownerControlResult = this.ownerControl(result.data as ILibrary,library);
        if(!ownerControlResult.success) return ownerControlResult;

        const uniqueResult = this.uniqueUserControl(result.data as ILibrary,library);
        if(!uniqueResult.success) return uniqueResult;

        return new SuccessResult();
    }

    private uniqueUserControl(currentLibrary:ILibrary , newLibrary:ILibrary):IResult{
        const currentUsers = currentLibrary.users;
        const newUsers = newLibrary.users; 

        let isExists:boolean = false;

        for (let i = 0; i < newUsers.length; i++) {
            const newUser = newUsers[i];
            isExists = currentUsers.some(user => user.userId.toString() == newUser.userId.toString());
            if(isExists) break;
        }

        return isExists ? new ErrorResult("The user is already in the library") : new SuccessResult();
    }

    private ownerControl(currentLibrary:ILibrary , newLibrary:ILibrary):IResult{
        const status = newLibrary.users.some(u => u.userId.toString() == currentLibrary.ownerId.toString());
        return status ? new ErrorResult("The owner is already in the library") : new SuccessResult();
    }

}