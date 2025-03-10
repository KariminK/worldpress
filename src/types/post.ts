import { Post } from "@prisma/client";
import { RequestHandler } from "express";

interface StatusResponse {
  status: number;
  message: string;
}

// create post types
interface CreateReqBody {
  title: string;
  content: string;
  authorId: number;
}

export type CreatePostRequestHandler = RequestHandler<{}, {}, CreateReqBody>;

// delete post types
interface DeleteReqParams {
  id: string;
}

export type DeletePostRequestHandler = RequestHandler<DeleteReqParams>;

// get post types
interface GetQuery {
  id?: string;
  limit?: string;
}
interface GetResBody {
  posts: Post | Post[];
}

export type GetPostRequestHandler = RequestHandler<
  {},
  GetResBody | StatusResponse,
  {},
  GetQuery
>;

// update post types

interface UpdateReqParams {
  id?: string;
}
interface UpdateReqBody {
  content: string;
  title: string;
}

export type UpdatePostRequestHandler = RequestHandler<
  UpdateReqParams,
  {} | StatusResponse,
  UpdateReqBody
>;
