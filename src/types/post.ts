// create post types

import { RequestHandler } from "express";

interface CreateReqBody {
  title: string;
  content: string;
  authorId: number;
}

export type CreatePostRequestHandler = RequestHandler<
  unknown,
  unknown,
  CreateReqBody
>;
