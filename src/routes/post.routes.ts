import { Router } from "express";
import { postController } from "../controllers";
import passport from "passport";

const postRouter = Router();

// You have to auth for every endpoint
postRouter.use(passport.authenticate("jwt", { session: false }));

postRouter.post("/", postController.createPost);
postRouter.delete("/:id", postController.deletePost);
postRouter.put("/:id", postController.updatePost);

export default postRouter;
