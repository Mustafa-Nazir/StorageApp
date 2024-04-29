import { inject, injectable } from "tsyringe";
import IFileService from "../../../Business/Abstract/IFileService";
import ErrorDataResult from "../../../Core/Utilities/Results/Concrete/ErrorDataResult";
import IFile from "../../../Models/Abstract/IFile";
import { FsStorageBucket } from "../../../DataAccess/Concrete/Firestore/FsStorageAppDb";
import ErrorResult from "../../../Core/Utilities/Results/Concrete/ErrorResult";
import HashingHelper from "../../../Core/Utilities/Security/Hashing/HashingHelper";
import IResult from "../../../Core/Utilities/Results/Abstract/IResult";
import IDataResult from "../../../Core/Utilities/Results/Abstract/IDataResult";
import SuccessDataResult from "../../../Core/Utilities/Results/Concrete/SuccessDataResult";

@injectable()
export default class FileController {
    private _fileService: IFileService;
    constructor(@inject("IFileService") fileService: IFileService) {
        this._fileService = fileService
    }

    private getFilePath = (libraryId: string, folderId: string, fileName: string) => {
        return `${libraryId}/${folderId}/${fileName}`
    }

    public async Add(req: any, res: any) {
        try {
            if (!req.file) {
                return res.status(400).send(new ErrorResult("No file uploaded"));
            }

            const file: IFile = JSON.parse(req.body.data);

            const fileSize: number = req.file.size;
            const resultForSize = await this._fileService.LibraryEmptySizeControl(file.libraryId.toString(), fileSize);
            if (!resultForSize.success) return res.status(400).send(resultForSize);
            file.size = fileSize;
            
            const resultForFile = await this._fileService.GetByLibraryIdFolderIdAndName(file.libraryId.toString(), file.folderId.toString(), file.name);
            if (resultForFile.success) return res.status(400).send(new ErrorDataResult<any>(undefined, "There is a file with the same name"));

            const filePath = this.getFilePath(file.libraryId.toString(), file.folderId.toString(), file.name);
            const blob = FsStorageBucket.file(filePath);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype
                }
            });

            blobStream.on('error', error => {
                res.status(500).send(new ErrorDataResult<any>(error));
            });

            blobStream.on('finish', async () => {
                try {
                    const options = {
                        action: 'read',
                        expires: '03-09-2491'
                    };

                    const [url] = await blob.getSignedUrl(options as any);

                    file.url = url;
                    const result = await this._fileService.Add(file);
                    return res.status(200).send(result);

                } catch (error: any) {
                    res.status(500).send(new ErrorDataResult<any>(error));
                }
            });

            blobStream.end(req.file.buffer);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    private deleteFile = async (file: IFile): Promise<IResult> => {
        const filePath = this.getFilePath(file.libraryId.toString(), file.folderId.toString(), file.name);

        const blob = FsStorageBucket.file(filePath);
        await blob.delete();
        const result = await this._fileService.Delete(file);

        return result;
    }

    private passwordControl = async (file: IFile): Promise<IDataResult<IFile>> => {
        const resultForFile = await this._fileService.GetById(file._id);
        if (!resultForFile.success) return resultForFile;

        const passwordStatus = await HashingHelper.VerifyPasswordHash(file.password, resultForFile.data?.password as string);
        if (!passwordStatus) return new ErrorDataResult<IFile>(undefined, "The password is wrong");

        return new SuccessDataResult<IFile>(resultForFile.data);
    }

    public async DeleteUnencrypted(req: any, res: any) {
        try {
            const file: IFile = req.body;

            const result = await this.deleteFile(file);
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async DeleteEncrypted(req: any, res: any) {
        try {
            const file: IFile = req.body;
            const resultForPassword = await this.passwordControl(file);
            if (!resultForPassword.success) return res.status(400).send(resultForPassword);

            const result = await this.deleteFile(file);
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetAllByFolderIdDto(req: any, res: any) {
        try {
            const { id } = req.params;

            const result = await this._fileService.GetAllByFolderIdDto(id);
            res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async DownloadEncryptedFile(req: any, res: any) {
        try {
            const file: IFile = req.body;
            const resultForPassword = await this.passwordControl(file);
            if (!resultForPassword.success) return res.status(400).send(resultForPassword);

            const url = resultForPassword.data?.url;
            return res.status(200).send(new SuccessDataResult<string>(url));
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }

    public async GetTotalSizeByLibraryId(req: any, res: any) {
        try {
            const {id} = req.params;

            const result = await this._fileService.GetTotalSizeByLibraryId(id);
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(new ErrorDataResult<any>(error));
        }
    }
}