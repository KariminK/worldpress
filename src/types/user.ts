import { RequestHandler } from "express";
import { AuthError } from "../validations";
import { User } from "@prisma/client";

// login types
export interface UserPayload {
  id: number;
  email: string;
  username: string;
  profileImage: string | null;
}

interface LogInResBody {
  message: string;
  token: string;
  user: UserPayload;
}

interface LogInReqBody {
  email: string;
  password: string;
}

export type LogInRequestHandler = RequestHandler<
  unknown,
  LogInResBody | AuthError,
  LogInReqBody
>;

// sign in types
interface SignInResBody {
  message: string;
}

interface SignInReqBody {
  email: string;
  username: string;
  password: string;
}

export type SignInRequestHandler = RequestHandler<
  unknown,
  SignInResBody | AuthError,
  SignInReqBody
>;

// getUserInfo types
interface GetInfoParams {
  username: string;
}

interface GetInfoResBody {
  username: string;
  admin: boolean;
  createdAt: Date;
  profileImage: string | null;
}

export type GetInfoRequestHandler = RequestHandler<
  GetInfoParams,
  GetInfoResBody | AuthError
>;

// updateUser types
interface UpdateUsernameReqBody {
  username: string;
  email: string;
}

interface UpdateUsernameResBody {
  message: string;
  user: Omit<User, "password">;
}

export type UpdateUsernameRequestHandler = RequestHandler<
  unknown,
  UpdateUsernameResBody,
  UpdateUsernameReqBody
>;
