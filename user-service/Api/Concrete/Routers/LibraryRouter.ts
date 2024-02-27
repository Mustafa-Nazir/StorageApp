import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import LibraryController from "../Controllers/LibraryController";

const router = express.Router();

const libraryController = container.resolve(LibraryController);

router.post("/add",(req:any , res:any) => {libraryController.Add(req,res);});
router.post("/addDepartments",(req:any , res:any) => {libraryController.AddDepartments(req,res);});

export default router;