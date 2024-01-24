import express from "express";
import dotenv from "dotenv";
import userRouter from "./Api/Concrete/Routers/UserServiceRouter";

dotenv.config();

const app = express();

app.use(userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`gateway server is running on port:${PORT}`);
});