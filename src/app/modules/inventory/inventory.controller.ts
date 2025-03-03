import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { RequestHandler } from "express";
import AppError from "../../errors/AppError";
import { addSizeIntoDB } from "./inventory.service";

export const addSize = catchAsync(async (req, res) => {
  const { size } = req.body;
  if (!size) {
    throw new AppError(httpStatus.BAD_REQUEST, "Size is required");
  }
  const result = await addSizeIntoDB(size);

  sendResponse(res, {
    message: "Size added successfully",
    data: result,
  });
});
 
export const addTag = catchAsync(async (req, res) => {});

export const getTag = catchAsync(async (req, res) => {});
export const getSize = catchAsync(async (req, res) => {});

export const deleteTag: RequestHandler = catchAsync(async (req, res) => {});
export const deleteSize: RequestHandler = catchAsync(async (req, res) => {});


