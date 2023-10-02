import { Router } from "express";
import { postUrl } from "../Controllers/urlController.js";
import validateAuth from "../Middlewares/validateAuth.js";
import validateSchema from "../Middlewares/validateSchema.js";
import { postUrlSchema } from "../Schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateAuth, validateSchema(postUrlSchema), postUrl);

export default urlRouter;