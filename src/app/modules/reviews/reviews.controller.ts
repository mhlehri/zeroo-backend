import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createReviewIntoDB,
  deleteReviewByIdFormDB,
  getReviewsFromDB,
  updateReviewIsShownIntoDB,
} from "./reviews.service";
import { RequestHandler } from "express";
import AppError from "../../errors/AppError";

//? This function is used to handle the request to create a Review
export const createReview = catchAsync(async (req, res) => {
  const result = await createReviewIntoDB(req.body);
  // console.log(result);

  sendResponse(res, {
    message: "Reviews created successfully",
    data: result,
  });
});

//? This function is used to handle the request to get all available Reviews
export const getReviews = catchAsync(async (req, res) => {
  const result = await getReviewsFromDB(req.params.id);
  // console.log(result);

  if (!result.length) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: result,
    });
    return;
  }

  sendResponse(res, {
    message: "Available Reviews retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to delete a Review by id
export const deleteReviewById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await deleteReviewByIdFormDB(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete");
  }

  sendResponse(res, {
    message: "Review deleted successfully",
    data: result,
  });
});

//? This function is used to handle the request to update a Review isShown by id
export const updateReviewIsShown: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const { isShown } = req.body;

    const result = await updateReviewIsShownIntoDB(id, isShown);
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update");
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Review updated successfully",
      data: result,
    });
  }
);
