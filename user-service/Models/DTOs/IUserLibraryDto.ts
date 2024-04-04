import IDto from "../../Core/Models/Abstract/IDto"

export default interface IUserLibraryDto extends IDto{
    departments:{
        _id:string,
        name:string
    }[],
    role:{
        _id:string,
        name:string
    }
}