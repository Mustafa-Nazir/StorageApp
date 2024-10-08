import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./Api/Concrete/Routers/UserServiceRouter";
import fileRouter from "./Api/Concrete/Routers/FileServiceRouter";
import { TokenControl } from "./Api/Concrete/Middlewares/AuthMiddleware";
import { RedisConnect } from "./DataAccess/Concrete/Redis/RedisClient";

dotenv.config();
RedisConnect();

const app = express();

app.use(cors());

app.use((req,res,next) => {TokenControl(req,res,next)});

app.use(userRouter);
app.use(fileRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`gateway server is running on port:${PORT}`);
});