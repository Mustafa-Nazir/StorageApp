import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import LibraryController from "../Controllers/LibraryController";

const router = express.Router();

const libraryController = container.resolve(LibraryController);

router.post("/add",(req:any , res:any) => {libraryController.Add(req,res);});
router.patch("/addDepartments",(req:any , res:any) => {libraryController.AddDepartments(req,res);});
router.get("/getAll",(req:any , res:any) => {libraryController.GetAllByUserId(req,res);});
router.get("/getDepartmentsAndRoles/:id",(req:any , res:any) => {libraryController.GetDepartmentsAndRolesByLibraryId(req,res);});
router.get("/userControlByLibraryId/:id",(req:any , res:any) => {libraryController.UserControlByLibraryId(req,res);});
router.get("/getUserDepartmentAndRole/:id",(req:any , res:any) => {libraryController.GetUserDepartmentAndRole(req,res);});

export default router;