import { prisma } from "../configs";
import {
  CreatePostRequestHandler,
  DeletePostRequestHandler,
  GetPostRequestHandler,
} from "../types/post";

const getPost: GetPostRequestHandler = async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    const posts = await prisma.post.findMany();
    res.send({ posts });
    return;
  }

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });

  if (!post) {
    res.status(404).send({ status: 404, message: "Folder not found" });
    return;
  }

  res.send({ posts: post });
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

const deletePost: DeletePostRequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({ where: { id: Number(id) } });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export default { getPost, createPost, deletePost };
