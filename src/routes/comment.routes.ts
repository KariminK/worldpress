import { Router } from "express";
import { commentController } from "../controllers";

const commentRouter = Router();

commentRouter.get("/:postId", commentController.getComment);

commentRouter.post("/", commentController.createComment);

commentRouter.delete("/:commentId", commentController.deleteComment);

export default commentRouter;
