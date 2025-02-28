import { prisma } from "../configs";
import { CreateCommentRequestHandler } from "../types/comment";

const createComment: CreateCommentRequestHandler = async (req, res, next) => {
  try {
    const { content, postId, authorId } = req.body;
    await prisma.comment.create({ data: { content, authorId, postId } });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export default {
  createComment,
};
