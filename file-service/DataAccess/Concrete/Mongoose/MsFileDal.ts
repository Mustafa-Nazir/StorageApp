import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import IFile from "../../../Models/Abstract/IFile";
import { File } from "../../../Models/Concrete/File";
import IFileDal from "../../Abstract/IFileDal";
import IFileDto from "../../../Models/DTOs/IFileDto";
import { Types } from "mongoose";

@injectable()
export default class MsFileDal extends MsModelRepositoryBase<IFile> implements IFileDal{
    constructor(){
        super(File)
    }
    
    public async GetAllByFolderIdDto(id: string): Promise<IFileDto[]> {
        const data = File.aggregate([
            {
                $match:{
                    folderId: new Types.ObjectId(id)
                }
            },
            {
                $addFields:{
                    encrypted:{
                        $cond:{
                            if:{$eq:["$password",""]},
                            then: false,
                            else: true
                        }
                    },
                    url:{
                        $cond:{
                            if:{$eq:["$password",""]},
                            then: "$url",
                            else: ""
                        }
                    }
                }
            },
            {
                $project: {
                  password:0
                }
            }
        ]).then(res => res)
        return data;
    }
}