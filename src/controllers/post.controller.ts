import { prisma } from "../configs";
import {
  CreatePostRequestHandler,
  DeletePostRequestHandler,
  GetPostRequestHandler,
  UpdatePostRequestHandler,
} from "../types/post";

const getPost: GetPostRequestHandler = async (req, res, next) => {
  try {
    const { id, limit = "50" } = req.query;

    if (!id) {
      const posts = await prisma.post.findMany({ take: Number(limit) });
      res.send({ posts });
      return;
    }

    const post = await prisma.post.findUnique({ where: { id: Number(id) } });

    if (!post) {
      res.status(404).send({ status: 404, message: "Post not found" });
      return;
    }

    res.send({ posts: post });
  } catch (error) {
    next(error);
  }
};

const createPost: CreatePostRequestHandler = async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;
    await prisma.post.create({ data: { title, content, authorId } });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const updatePost: UpdatePostRequestHandler = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    if (!title) {
      res.status(400).send({ status: 400, message: "Post must have title" });
      return;
    }

    await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const deletePost: DeletePostRequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({ where: { id: Number(id) } });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export default { getPost, createPost, deletePost, updatePost };
