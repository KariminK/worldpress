import { RequestHandler } from "express";

const createPost: RequestHandler = (req, res) => {
  res.send("ok");
};

export default { createPost };
