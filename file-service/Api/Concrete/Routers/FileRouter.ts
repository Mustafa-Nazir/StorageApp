import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import FileController from "../Controllers/FileController";
import { MulterUploadSingle } from "../Middlewares/MulterMiddleware";

const router = express.Router();

const fileController = container.resolve(FileController);

router.post("/add",MulterUploadSingle,(req,res)=>{fileController.Add(req,res);});
router.delete("/delete/:id",(req,res)=>{fileController.Delete(req,res);});
router.get("/getAllByFolderIdDto/:id",(req,res)=>{fileController.GetAllByFolderIdDto(req,res);})

export default router;