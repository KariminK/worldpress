import jwt, { VerifyCallback } from "passport-jwt";
import prisma from "./prisma";
import { User } from "@prisma/client";

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const jwtSecret = process.env.STRATEGY_SECRET;

if (!jwtSecret)
  throw new Error("Error: You must provide strategy secret in your .env file");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const verify: VerifyCallback = async (userPayload: User, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
    });
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  } catch (error) {
    done(error, false);
  }
};
const configuredStrategy = new JwtStrategy(options, verify);

export default configuredStrategy;
