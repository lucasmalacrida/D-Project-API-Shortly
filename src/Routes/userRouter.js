import { Router } from "express";
import { signUp, signIn } from "../Controllers/userController.js";
// import validateAuth from "../Middlewares/validateAuth.js";
import validateSchema from "../Middlewares/validateSchema.js";
import { SignUpSchema , SignInSchema } from "../Schemas/userSchema.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(SignUpSchema), signUp);
userRouter.post('/signin', validateSchema(SignInSchema), signIn);
// userRouter.delete('/logout', validateAuth, logOut);

export default userRouter;