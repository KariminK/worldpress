import { RequestHandler } from "express";
import { validationResult } from "express-validator";

const checkValidationResult: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors);
    return;
  }
  next();
};

export default checkValidationResult;
