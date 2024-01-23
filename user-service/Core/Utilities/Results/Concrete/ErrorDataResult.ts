import DataResult from "./DataResult";

export default class ErrorDataResult<T> extends DataResult<T>{
    constructor(data?:T,message?:string) {
        super(data,false,message);
    }
}