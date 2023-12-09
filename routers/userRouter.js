import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { getUserUrls } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.get("/users/me", tokenValidation, getUserUrls);

export default userRouter;
