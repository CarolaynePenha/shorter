import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import urlRouter from "./routers/urlRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);
app.listen(process.env.ACCESS_PORT);
