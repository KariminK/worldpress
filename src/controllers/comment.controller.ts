import { RequestHandler } from "express";
import { prisma } from "../configs";
import {
  CreateCommentRequestHandler,
  DeleteCommentRequestHandler,
  GetCommentRequestHandler,
} from "../types/comment";

const createComment: CreateCommentRequestHandler = async (req, res, next) => {
  try {
    const { content, postId, authorId } = req.body;
    await prisma.comment.create({ data: { content, authorId, postId } });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const getComment: GetCommentRequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id } = req.query;

    if (!id) {
      const comments = await prisma.comment.findMany({ where: { postId } });
      if (!comments) {
        res.status(404).send({ status: 404, message: "Comment not found" });
        return;
      }
      res.send(comments);
      return;
    }

    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      res.status(404).send({ status: 404, message: "Comment not found" });
      return;
    }

    res.send(comment);
  } catch (error) {
    next(error);
  }
};

const deleteComment: DeleteCommentRequestHandler = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });
    if (!deletedComment) {
      res.status(404).send({ status: 404, message: "Comment not found" });
      return;
    }
    res.send({ status: 200, message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  createComment,
  getComment,
  deleteComment,
};
