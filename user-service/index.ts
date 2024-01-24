import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./Api/Concrete/Routers/AuthRouter";
import MsStorageAppDb from "./DataAccess/Concrete/Mongoose/MsStorageAppDb";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);

const PORT = process.env.PORT || 8000;

MsStorageAppDb.DbConnect();

app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
});