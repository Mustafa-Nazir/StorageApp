import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./Api/Concrete/Routers/AuthRouter";
import libraryRouter from "./Api/Concrete/Routers/LibraryRouter";
import userRouter from "./Api/Concrete/Routers/UserRouter";
import userWaitingListRouter from "./Api/Concrete/Routers/UserWaitingListRouter";
import MsStorageAppDb from "./DataAccess/Concrete/Mongoose/MsStorageAppDb";
import IRPCServer from "./Api/RPC/IRPCServer";
import {container} from "./Api/DependencyResolvers/TSyrnge/IoCContainer"

dotenv.config();

const rpcServer:IRPCServer = container.resolve<IRPCServer>("IRPCServer");
rpcServer.Start();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/library", libraryRouter);
app.use("/",userRouter);
app.use("/waitingList",userWaitingListRouter);

const PORT = process.env.PORT || 8000;

MsStorageAppDb.DbConnect();

app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
});