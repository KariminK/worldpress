import express from "express";
import passport from "passport";
import { configuredJwtStrategy } from "./configs";
import { userRouter } from "./routes";
import { errorMiddleware } from "./middlewares";

const app = express();

passport.use(configuredJwtStrategy);

app.use(passport.initialize());
app.use(express.json());

app.use("/user", userRouter);
app.use(errorMiddleware);
export default app;
