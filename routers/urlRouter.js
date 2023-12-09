import { Router } from "express";
import { urlSchema } from "../middlewares/urlMiddlewares.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import {
  deleteLink,
  getLink,
  getShortUrl,
  shortUrl,
} from "../controllers/urlsControlles.js";
const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenValidation, urlSchema, shortUrl);
urlRouter.get("/urls/:id", getLink);
urlRouter.get("/urls/open/:shortUrl", getShortUrl);
urlRouter.delete("/urls/:id", tokenValidation, deleteLink);

export default urlRouter;
