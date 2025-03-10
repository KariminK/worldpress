import jwt, { VerifyCallback } from "passport-jwt";
import prisma from "./prisma";
import { UserPayload } from "../types/user";

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const jwtSecret = process.env.STRATEGY_SECRET;

if (!jwtSecret)
  throw new Error("Error: You must provide strategy secret in your .env file");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const verify: VerifyCallback = async (userPayload: UserPayload, done) => {
  try {
    console.log("Payload: ", userPayload);
    const user = await prisma.user.findUnique({
      where: { email: userPayload.email },
    });
    if (!user) {
      return done(null, false);
    } else {
      console.log("Verified user: ", user);
      return done(null, user);
    }
  } catch (error) {
    done(error, false);
  }
};
const configuredJwtStrategy = new JwtStrategy(options, verify);

export default configuredJwtStrategy;
