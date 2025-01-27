import { Request, Response } from "express";
import httpStatus from "http-status";

export const notFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Not Found",
  });
};
