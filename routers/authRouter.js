import { Router } from "express";
import { signInSchema, signUpSchema } from "../middlewares/authMiddlewares.js";
import { signIn, signUp } from "../controllers/authControllers.js";
const authRouter = Router();

authRouter.post("/signup", signUpSchema, signUp);
authRouter.post("/signIn", signInSchema, signIn);

export default authRouter;
