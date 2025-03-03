import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { RequestHandler } from "express";
import AppError from "../../errors/AppError";
import { addSizeIntoDB, addTagIntoDB, getSizesFromDB, getTagsFromDB } from "./inventory.service";

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
 
export const addTag = catchAsync(async (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    throw new AppError(httpStatus.BAD_REQUEST, "Tag is required");
  }
  const result = await addTagIntoDB(tag);

  sendResponse(res, {
    message: "Tag added successfully",
    data: result,
  });
});

export const getTag = catchAsync(async (req, res) => {
  const result = await getTagsFromDB();
  sendResponse(res, {
    message: "Tags fetched successfully",
    data: result,
  });
});
export const getSize = catchAsync(async (req, res) => {
  const result = await getSizesFromDB();
  sendResponse(res, {
    message: "Sizes fetched successfully",
    data: result,
  });
});

export const deleteTag: RequestHandler = catchAsync(async (req, res) => {});
export const deleteSize: RequestHandler = catchAsync(async (req, res) => {});


