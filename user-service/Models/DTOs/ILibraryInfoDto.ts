import IDto from "../../Core/Models/Abstract/IDto";

export default interface ILibraryInfoDto extends IDto{
    _id:string,
    name:string,
    ownerId:{
        _id:string,
        name:string,
        surname:string,
        email:string
    }
    sizeGb:number,
}