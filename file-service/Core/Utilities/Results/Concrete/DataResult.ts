import IDataResult from "../Abstract/IDataResult";
import Result from "./Result";

export default class DataResult<T> extends Result implements IDataResult<T>{
    public data?: T;
    constructor(data:T | undefined , success:boolean , message?:string){
        super(success,message);
        this.data = data;
    }

}