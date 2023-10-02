import { Router } from "express";
import { postUrl, getUrl, accessUrl, deleteUrl } from "../Controllers/urlController.js";
import validateAuth from "../Middlewares/validateAuth.js";
import validateSchema from "../Middlewares/validateSchema.js";
import { postUrlSchema } from "../Schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateAuth, validateSchema(postUrlSchema), postUrl);
urlRouter.get('/urls/:id', getUrl);
urlRouter.get('/urls/open/:shortUrl', accessUrl);
urlRouter.delete('/urls/:id', validateAuth, deleteUrl);

export default urlRouter;