import { prisma } from "../configs";
import { AuthError } from "../validations";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET ?? "";
const tokenExpireInSec = Number(process.env.TOKEN_EXPIRE_DURATION) ?? 300;

if (!tokenSecret)
  throw new Error("You must provide token secret in your .env file");

const logIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email, password } });

  if (!user) {
    res.status(401).send(new AuthError(401, "Invalid Login or Password"));
    return;
  }

  const userPayload: UserPayload = {
    id: user.id,
    email,
    password,
  };

  const token = jwt.sign(userPayload, tokenSecret, {
    expiresIn: tokenExpireInSec,
  });

  res.send({
    message: "Authorized Correctly!",
    token,
  });
};

const signIn: RequestHandler = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    await prisma.user.create({ data: { email, password, username } });
    res.status(200).send({ message: "Signed in successfully" });
  } catch (error) {
    next(error);
  }
};

export default { logIn, signIn };
