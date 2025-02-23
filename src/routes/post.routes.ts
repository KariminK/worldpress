import { Router } from "express";
import { postController } from "../controllers";
import passport from "passport";

const postRouter = Router();

// You have to auth for every endpoint
postRouter.use(passport.authenticate("jwt", { session: false }));

postRouter.post("/", postController.createPost);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;
