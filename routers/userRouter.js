import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { getRanking, getUserUrls } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.get("/users/me", tokenValidation, getUserUrls);
userRouter.get("/users/ranking", getRanking);

export default userRouter;
