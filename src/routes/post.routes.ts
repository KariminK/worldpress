import { Router } from "express";
import { postController } from "../controllers";
import passport from "passport";

const postRouter = Router();

postRouter.post("/", passport.authenticate("jwt"), postController.createPost);
