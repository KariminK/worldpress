import express from "express";
import passport from "passport";
import { configuredJwtStrategy } from "./configs";
import { commentRouter, postRouter, userRouter } from "./routes";
import { errorMiddleware } from "./middlewares";
import cors from "cors";

const app = express();

passport.use(configuredJwtStrategy);

app.use(cors());
app.use(passport.initialize());
app.use(express.json());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use(errorMiddleware);
export default app;
