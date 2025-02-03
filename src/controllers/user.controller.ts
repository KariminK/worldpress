import { prisma } from "../configs";
import { AuthError } from "../validations";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET ?? "";
const tokenExpireInSec = Number(process.env.TOKEN_EXPIRE_DURATION) ?? 300;

if (!tokenSecret)
  throw new Error("You must provide token secret in your .env file");

const logIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).send(new AuthError(401, "Invalid Login or Password"));
    return;
  }
  const comparePasswords = await bcrypt.compare(password, user.password);
  if (!comparePasswords) {
    res.status(401).send(new AuthError(401, "Invalid password"));
    return;
  }

  const userPayload: UserPayload = {
    id: user.id,
    email,
    username: user.username,
    profileImage: user.profileImage,
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
    const user = await prisma.user.findUnique({ where: { email, username } });
    if (user) {
      res
        .status(409)
        .send(new AuthError(409, "User with this email already exists"));
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    res.status(200).send({ message: "Signed in successfully" });
  } catch (error) {
    next(error);
  }
};

const getUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).send(new AuthError(404, "Usuer not found"));
      return;
    }
    const { password, ...publicData } = user;

    res.send(publicData);
  } catch (error) {
    next(error);
  }
};

export default { logIn, signIn, getUserInfo };
