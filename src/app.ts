import express from "express";
import passport from "passport";
import { configuredJwtStrategy } from "./configs";
import bodyParser from "body-parser";

const app = express();

passport.use(configuredJwtStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Api is running!");
});
export default app;
