import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import urlRouter from "./routers/urlRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(authRouter);
app.use(urlRouter);
app.listen(process.env.ACCESS_PORT);
