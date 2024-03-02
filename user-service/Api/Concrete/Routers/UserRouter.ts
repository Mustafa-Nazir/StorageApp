import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import UserController from "../Controllers/UserController";

const router = express.Router();

const userController = container.resolve(UserController);

router.get("/getUserInfo", (req: any, res: any) => { userController.GetUserInfo(req, res) });

export default router;