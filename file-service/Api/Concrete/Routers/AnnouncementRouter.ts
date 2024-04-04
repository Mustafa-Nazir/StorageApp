import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import AnnouncementController from "../Controllers/AnnouncementController";

const router = express.Router();

const announcementController = container.resolve(AnnouncementController);

router.post("/add",(req:any , res:any) => {announcementController.Add(req,res);});
router.get("/getAllByCategoryId/:categoryId" , (req:any , res:any) => {announcementController.GetAllByCategoryId(req,res);});

export default router;