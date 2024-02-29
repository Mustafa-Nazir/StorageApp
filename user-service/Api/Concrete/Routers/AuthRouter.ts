import express from "express";
import { container } from "../../DependencyResolvers/TSyrnge/IoCContainer";
import AuthController from "../Controllers/AuthController";

const router = express.Router();

const authController = container.resolve(AuthController);

router.post("/login", (req, res) => {authController.Login(req, res);});
router.post("/register", (req, res) => {authController.Register(req, res);});
router.get("/tokenControl" , (req,res) => {authController.TokenControl(req,res)});

export default router;