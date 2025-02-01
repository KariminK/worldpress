import { Router } from "express";
import { validateSignIn } from "../validations";
import { checkValidationResult } from "../middlewares";
import { authController } from "../controllers";

const authRouter = Router();

authRouter.post(
  "/sign-in",
  ...validateSignIn,
  checkValidationResult,
  authController.signIn
);

authRouter.post("/log-in", authController.logIn);

export default authRouter;
