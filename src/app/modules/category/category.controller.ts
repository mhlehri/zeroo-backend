import { RequestHandler } from "express";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  addSubCategoryToCategoryIntoDB,
  createCategoryIntoDB,
  unpublishCategoryByIdFormDB,
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

//? This function is used to handle the request to add a SubCategory to a Category
export const addSubCategoryToCategory: RequestHandler = catchAsync(
  async (req, res) => {
    const { categoryId, name } = req.body;
    const result = await addSubCategoryToCategoryIntoDB(categoryId, name);

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to add SubCategory");
    }

    sendResponse(res, {
      message: "SubCategory added successfully",
      data: result,
    });
  }
);

//? This function is used to handle the request to unpublish a Category by id
export const unpublishCategoryById: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;

    const result = await unpublishCategoryByIdFormDB(id);
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to unpublish");
    }

    sendResponse(res, {
      message: "Category unpublished successfully",
      data: result,
    });
  }
);
