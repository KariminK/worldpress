import { prisma } from "../configs";
import { AuthError } from "../validations";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import {
  GetInfoRequestHandler,
  LogInRequestHandler,
  SignInRequestHandler,
  UpdateUsernameRequestHandler,
} from "../types/user";

dotenv.config();

const tokenSecret = process.env.STRATEGY_SECRET ?? "";
const tokenExpireInSec = Number(process.env.TOKEN_EXPIRE_DURATION) ?? 300;

if (!tokenSecret)
  throw new Error("You must provide token secret in your .env file");

const logIn: LogInRequestHandler = async (req, res) => {
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

  const userPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
  };

  const token = jwt.sign(userPayload, tokenSecret, {
    expiresIn: tokenExpireInSec,
  });

  res.send({
    message: "Authorized Correctly!",
    token,
    user: userPayload,
  });
};

const signIn: SignInRequestHandler = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (user) {
      res
        .status(409)
        .send(
          new AuthError(409, "User with this email or username already exists")
        );
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

const getUserInfo: GetInfoRequestHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).send(new AuthError(404, "Usuer not found"));
      return;
    }
    const { password, id, email, ...publicData } = user;

    res.send(publicData);
  } catch (error) {
    next(error);
  }
};

const updateUsername: UpdateUsernameRequestHandler = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const { password, ...updatedUser } = await prisma.user.update({
      where: { email },
      data: { username },
    });

    res.send({ message: "updated correctly", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export default { logIn, signIn, getUserInfo, updateUsername };
