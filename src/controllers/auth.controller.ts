import { prisma } from "../configs";
import { AuthError } from "../validations";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET ?? "";
const tokenExpireInSec = Number(process.env.TOKEN_EXPIRE_DURATION) ?? 300;

if (!tokenSecret)
  throw new Error("You must provide token secret in your .env file");

async function logIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email, password } });

  if (!user) {
    return res
      .status(401)
      .send(new AuthError(401, "Invalid Login or Password"));
  }

  const userPayload: UserPayload = {
    id: user.id,
    email,
    password,
  };

  const token = jwt.sign(userPayload, tokenSecret, {
    expiresIn: tokenExpireInSec,
  });

  return res.send({
    message: "Authorized Correctly!",
    token,
  });
}

export default { logIn };
