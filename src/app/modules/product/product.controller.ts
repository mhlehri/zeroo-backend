import { RequestHandler } from "express";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createProductIntoDB,
  deleteProductByIdFormDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductByIdIntoDB,
} from "./product.service";

//? This function is used to handle the request to create a Product
export const createProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await createProductIntoDB(req.body);

  sendResponse(res, {
    message: "Product added successfully",
    data: result,
  });
});

//? This function is used to handle the request to get all Products
export const getAllProduct: RequestHandler = catchAsync(async (req, res) => {
  const {
    searchTerm,
    category,
    priceFilter,
    sortOrder,
    currentPage,
    productsPerPage,
  } = req.query;

  const page = Number(currentPage);
  const limit = Number(productsPerPage);

  const filters = {
    searchTerm: searchTerm?.toString() || "",
    FCategory: category as string,
    priceFilter: priceFilter ? Number(priceFilter) : 0,
    sortOrder:
      sortOrder === "asc" || sortOrder === "desc" || sortOrder === "new"
        ? (sortOrder as "asc" | "desc" | "new")
        : undefined,
  };

  const result = await getAllProductsFromDB(filters, page, limit);

  if (!result?.products?.length)
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: result,
    });

  sendResponse(res, {
    message: "Product retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to get a Product by id
export const getProductById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getProductByIdFromDB(id);

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
    message: "Product retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to update a Product by id
export const updateProductById: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateProductByIdIntoDB(id, data);

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update");
    }

    sendResponse(res, {
      message: "Product updated successfully",
      data: result,
    });
  }
);

//? This function is used to handle the request to delete a Product by id
export const deleteProductById: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;

    const result = await deleteProductByIdFormDB(id);
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete");
    }

    sendResponse(res, {
      message: "Product deleted successfully",
      data: result,
    });
  }
);
