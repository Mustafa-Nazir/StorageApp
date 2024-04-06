import IDto from "../../Core/Models/Abstract/IDto";

export default interface ILibraryUsersDto extends IDto {
    users: {
        userId: {
            _id: string,
            name: string,
            surname: string,
            email: string,
        },
        roleId: string,
        departmentId: string
    }[]
}