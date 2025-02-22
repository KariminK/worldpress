import { prisma } from "../configs";
import { CreatePostRequestHandler } from "../types/post";

const createPost: CreatePostRequestHandler = async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;
    await prisma.post.create({ data: { title, content, authorId } });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export default { createPost };
