import Result from "./Result";

export default class SuccessResult extends Result{
    constructor(message?:string){
        super(true,message);
    }
}