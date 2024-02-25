import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./Api/Concrete/Routers/UserServiceRouter";
import fileRouter from "./Api/Concrete/Routers/FileServiceRouter";

dotenv.config();

const app = express();

app.use(cors());

app.use(userRouter);
app.use(fileRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`gateway server is running on port:${PORT}`);
});