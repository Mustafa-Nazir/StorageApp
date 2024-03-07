import { inject, injectable } from "tsyringe";
import IUserWaitingListService from "../Abstract/IUserWaitingListService";
import IUserWaitingListDal from "../../DataAccess/Abstract/IUserWaitingListDal";
import IResult from "../../Core/Utilities/Results/Abstract/IResult";
import IUserWaitingList from "../../Models/Abstract/IUserWaitingList";
import ErrorResult from "../../Core/Utilities/Results/Concrete/ErrorResult";
import SuccessResult from "../../Core/Utilities/Results/Concrete/SuccessResult";
import IDataResult from "../../Core/Utilities/Results/Abstract/IDataResult";
import SuccessDataResult from "../../Core/Utilities/Results/Concrete/SuccessDataResult";

@injectable()
export default class UserWaitingListManager implements IUserWaitingListService{
    private _waitingListDal:IUserWaitingListDal;

    constructor(@inject("IUserWaitingListDal") waitingListDal:IUserWaitingListDal) {
        this._waitingListDal = waitingListDal;
    }
    
    public async GetRequestsByEmail(email: string): Promise<IDataResult<IUserWaitingList[]>> {
        const data = await this._waitingListDal.GetAll({email:email});
        return new SuccessDataResult<IUserWaitingList[]>(data);
    }
    
    public async DeleteTheRequestById(id: string): Promise<IResult> {
        await this._waitingListDal.Delete({_id:id} as IUserWaitingList);
        return new SuccessResult();
    }
    
    public async AddUser(user: IUserWaitingList): Promise<IResult> {
        const result = await this._waitingListDal.Get({email:user.email,libraryId:user.libraryId});
        if(result != null) return new ErrorResult("The request has already been sent");

        await this._waitingListDal.Add(user);
        return new SuccessResult("The request was sent");
    }
}