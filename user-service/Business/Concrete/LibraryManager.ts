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

@injectable()
export default class LibraryManager implements ILibraryService{
    private _libraryDal:ILibraryDal;

    constructor(@inject("ILibraryDal")libraryDal:ILibraryDal) {
        this._libraryDal = libraryDal;
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
        const data = await this._libraryDal.GetAll({ownerId:id});
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
        return new SuccessResult();
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

}