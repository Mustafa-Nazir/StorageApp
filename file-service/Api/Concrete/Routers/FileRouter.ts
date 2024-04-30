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
router.get("/getAllByFolderIdDto/:id",(req,res)=>{fileController.GetAllByFolderIdDto(req,res);});
router.get("/getTotalSizeByLibraryId/:id",(req,res)=>{fileController.GetTotalSizeByLibraryId(req,res);});
router.get("/getTotalSizeAccordingToEmail/:id",(req,res)=>{fileController.GetTotalSizeAccordingToEmail(req,res);});
router.get("/getTotalSizeAccordingToDepartment/:id",(req,res)=>{fileController.GetTotalSizeAccordingToDepartment(req,res);});
router.get("/getAmountAccordingToDate/:id",(req,res)=>{fileController.GetAmountAccordingToDate(req,res);});

export default router;