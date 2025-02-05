import { Router } from "express";
import { validateSignIn } from "../validations";
import { checkValidationResult } from "../middlewares";
import { userController } from "../controllers";
import passport from "passport";

const userRouter = Router();

userRouter.get("/:username", userController.getUserInfo);

userRouter.post(
  "/sign-in",
  ...validateSignIn,
  checkValidationResult,
  userController.signIn
);

userRouter.post("/log-in", userController.logIn);

userRouter.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.updateUsername
);

export default userRouter;
