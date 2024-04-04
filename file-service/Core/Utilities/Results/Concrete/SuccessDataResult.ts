import DataResult from "./DataResult";

export default class SuccessDataResult<T> extends DataResult<T>{
    constructor(data?:T,message?:string) {
        super(data,true,message);
    }
} 