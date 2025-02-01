import express from "express";
import passport from "passport";
import { configuredJwtStrategy } from "./configs";
import bodyParser from "body-parser";
import { authRouter } from "./routes";

const app = express();

passport.use(configuredJwtStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", authRouter);
export default app;
