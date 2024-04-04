import Result from "./Result";

export default class ErrorResult extends Result{
    constructor(message?:string){
        super(false,message)
    }
}