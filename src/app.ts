import express from "express";
import passport from "passport";
import { configuredJwtStrategy } from "./configs";
import bodyParser from "body-parser";
import { userRouter } from "./routes";
import { errorMiddleware } from "./middlewares";

const app = express();

passport.use(configuredJwtStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use(errorMiddleware);
export default app;
