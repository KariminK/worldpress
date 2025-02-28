import { RequestHandler } from "express";

interface CreateReqBody {
  content: string;
  authorId: number;
  postId: number;
}

export type CreateCommentRequestHandler = RequestHandler<{}, {}, CreateReqBody>;
