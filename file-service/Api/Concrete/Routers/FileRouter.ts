import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import FileController from "../Controllers/FileController";
import { MulterUploadSingle } from "../Middlewares/MulterMiddleware";

const router = express.Router();

const fileController = container.resolve(FileController);

router.post("/add",MulterUploadSingle,(req,res)=>{fileController.Add(req,res);});
router.post("/deleteUnencrypted",(req,res)=>{fileController.DeleteUnencrypted(req,res);});
router.post("/deleteEncrypted",(req,res)=>{fileController.DeleteEncrypted(req,res);});
router.post("/downloadEncryptedFile",(req,res)=>{fileController.DownloadEncryptedFile(req,res);});
router.get("/getAllByFolderIdDto/:id",(req,res)=>{fileController.GetAllByFolderIdDto(req,res);})

export default router;