import { Comment } from "@prisma/client";
import { RequestHandler } from "express";

interface StatusResponse {
  status: number;
  message: string;
}

interface CreateReqBody {
  content: string;
  authorId: number;
  postId: number;
}

export type CreateCommentRequestHandler = RequestHandler<{}, {}, CreateReqBody>;

interface GetParams {
  postId: number;
}

interface GetQuery {
  id?: number;
}

export type GetCommentRequestHandler = RequestHandler<
  GetParams,
  Comment | Comment[] | StatusResponse,
  {},
  GetQuery
>;

interface DeleteParams {
  commentId: number;
}

export type DeleteCommentRequestHandler = RequestHandler<
  DeleteParams,
  StatusResponse,
  {}
>;
