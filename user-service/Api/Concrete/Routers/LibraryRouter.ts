import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import LibraryController from "../Controllers/LibraryController";

const router = express.Router();

const libraryController = container.resolve(LibraryController);

router.post("/add",(req:any , res:any) => {libraryController.Add(req,res);});
router.patch("/addDepartments",(req:any , res:any) => {libraryController.AddDepartments(req,res);});
router.get("/getAll",(req:any , res:any) => {libraryController.GetAllByUserId(req,res);});

export default router;