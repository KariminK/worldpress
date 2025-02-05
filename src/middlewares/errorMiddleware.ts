import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(500)
    .send({ message: "Internal server error", status: 500, error: err });
};

export default errorMiddleware;
