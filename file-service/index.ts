import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import MsStorageAppDb from "./DataAccess/Concrete/Mongoose/MsStorageAppDb";
import announcementRouter from "./Api/Concrete/Routers/AnnouncementRouter";
import folderRouter from "./Api/Concrete/Routers/FolderRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/announcement",announcementRouter);
app.use("/folder",folderRouter);

const PORT = process.env.PORT || 5000;

MsStorageAppDb.DbConnect();

app.listen(PORT, () => {
    console.log(`file server is running on port:${PORT}`);
});