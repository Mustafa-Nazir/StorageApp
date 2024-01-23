import IResult from "../Abstract/IResult";

export default class Result implements IResult{
    public message?:string;
    public success:boolean;

    constructor(success:boolean , message?:string) {
        this.message = message;
        this.success = success;
    }
}