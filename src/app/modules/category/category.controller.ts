import { RequestHandler } from "express";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createCategoryIntoDB,
  deleteCategoryByIdFormDB,
  getAllCategoriesFromDB,
  getCategoryByIdFromDB,
  updateCategoryByIdIntoDB,
} from "./category.service";

//? This function is used to handle the request to create a Category
export const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await createCategoryIntoDB(req.body);

  sendResponse(res, {
    message: "Category added successfully",
    data: result,
  });
});

//? This function is used to handle the request to get all Categories
export const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await getAllCategoriesFromDB();

  if (!result?.categories?.length)
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: result,
    });

  sendResponse(res, {
    message: "Category retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to get a Category by id
export const getCategoryById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getCategoryByIdFromDB(id);

  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
    return;
  }

  sendResponse(res, {
    message: "Category retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to update a Category by id
export const updateCategoryById: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateCategoryByIdIntoDB(id, data);

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update");
    }

    sendResponse(res, {
      message: "Category updated successfully",
      data: result,
    });
  }
);

//? This function is used to handle the request to delete a Category by id
export const deleteCategoryById: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;

    const result = await deleteCategoryByIdFormDB(id);
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete");
    }

    sendResponse(res, {
      message: "Category deleted successfully",
      data: result,
    });
  }
);
