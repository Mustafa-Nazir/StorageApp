import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import UserWaitingListController from "../Controllers/UserWaitingListController";

const router = express.Router();

const userWaitingListController = container.resolve(UserWaitingListController);

router.get("/getRequest",(req:any,res:any)=>{userWaitingListController.GetRequest(req,res)});
router.get("/getRequestDto",(req:any,res:any)=>{userWaitingListController.GetRequestDto(req,res)});
router.post("/rejectRequest",(req:any,res:any)=>{userWaitingListController.RejectRequest(req,res)});
router.post("/addUser",(req:any,res:any)=>{userWaitingListController.AddUser(req,res)});
router.patch("/acceptRequest",(req:any,res:any)=>{userWaitingListController.AcceptRequest(req,res)});

export default router;