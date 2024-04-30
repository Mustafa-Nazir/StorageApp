import { injectable } from "tsyringe";
import { MsModelRepositoryBase } from "../../../Core/DataAccess/Concrete/Mongoose/MsModelRepositoryBase";
import IFile from "../../../Models/Abstract/IFile";
import { File } from "../../../Models/Concrete/File";
import IFileDal from "../../Abstract/IFileDal";
import IFileDto from "../../../Models/DTOs/IFileDto";
import { Types } from "mongoose";
import IFileEmailDto from "../../../Models/DTOs/IFileEmailDto";
import IFileDepartmentDto from "../../../Models/DTOs/IFileDepartmentDto";
import IFileDateDto from "../../../Models/DTOs/IFileDateDto";

@injectable()
export default class MsFileDal extends MsModelRepositoryBase<IFile> implements IFileDal{
    constructor(){
        super(File)
    }
    
    public async GetAmountAccordingToDate(libraryId: string): Promise<IFileDateDto[]> {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getDate() - 30);

        const data = await File.aggregate([
            {$match: { libraryId: new Types.ObjectId(libraryId) , date:{ $gte: thirtyDaysAgo, $lte: today } }},
            {$group:{
                _id:{date:{$dateTrunc:{date:"$date",unit:"day"}}},
                amount: { $sum: 1 }
            }},
            {$project:{
                _id:0,
                date:"$_id.date",
                amount:1
            }},
            { $sort: { date: 1 } }
        ])

        return data;
    }
    
    public async GetTotalSizeAccordingToDepartment(libraryId: string): Promise<IFileDepartmentDto[]> {
        const data = await File.aggregate([
            {$match: { libraryId: new Types.ObjectId(libraryId) }},
            {$group: {
                _id: {departmentId: '$departmentId' },
                totalSize: { $sum: '$size' },
                amount: { $sum: 1 }
            }},
            {$project:{
                _id:0,
                departmentId:"$_id.departmentId",
                totalSize:1,
                amount:1
            }}
        ])

        return data;
    }
    
    public async GetTotalSizeAccordingToEmail(libraryId: string): Promise<IFileEmailDto[]> {
        const data = await File.aggregate([
            {$match: { libraryId: new Types.ObjectId(libraryId) }},
            {$group: {
                _id: {email: '$email' },
                totalSize: { $sum: '$size' },
                amount: { $sum: 1 }
            }},
            {$project:{
                _id:0,
                email:"$_id.email",
                totalSize:1,
                amount:1
            }}
        ]);

        return data;
    }
    
    public async GetTotalSizeByLibraryId(id: string): Promise<number> {
        const data = await File.aggregate([
            {$match: { libraryId: new Types.ObjectId(id) }},
            {$group: { _id: null, totalSize: { $sum: '$size' } }}
        ]); 

        return data.length <= 0 ? 0 : data[0].totalSize;
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