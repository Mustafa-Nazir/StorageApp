import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import FolderController from "../Controllers/FolderController";

const router = express.Router();

const folderController = container.resolve(FolderController);

router.post("/add",(req:any,res:any)=>{folderController.Add(req,res);});

export default router;