import { Router } from "express";
import { urlSchema } from "../middlewares/urlMiddlewares.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import { shortUrl } from "../controllers/urlsControlles.js";
const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenValidation, urlSchema, shortUrl);

export default urlRouter;
