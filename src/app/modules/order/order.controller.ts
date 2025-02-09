import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  addOrderIntoDB,
  getAllOrdersFromDB,
  getMyOrdersFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
} from "./order.service";
import AppError from "../../errors/AppError";

//? This function is used to handle the request to get all Orders
export const getAllOrders = catchAsync(async (req, res) => {
  const { today } = req.query;
  const result = await getAllOrdersFromDB({ today: today === "true" });
  if (!result.length) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
    return;
  }
  sendResponse(res, {
    message: "All orders retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to add a Order
export const addOrder = catchAsync(async (req, res) => {
  const result = await addOrderIntoDB(req.body);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to add Order");
  }

  sendResponse(res, {
    message: "Order added successfully",
    data: result,
  });
});

//? This function is used to handle the request to update a Order
export const updateOrder = catchAsync(async (req, res) => {
  //   console.log(req.params.id, "req.params.id");
  const result = await updateOrderIntoDB(req.params.id, req.body);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order update failed");
  }
  sendResponse(res, {
    message: "Order updated successfully",
    data: result,
  });
});

//? This function is used to handle the request to delete a Order
export const deleteOrder = catchAsync(async (req, res) => {
  const result = await deleteOrderFromDB(req.params.id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order delete failed");
  }
  sendResponse(res, {
    message: "Order deleted successfully",
    data: result,
  });
});

//? This function is used to handle the request to get my Orders
export const getMyOrders = catchAsync(async (req, res) => {
  //   console.log(req.user, "req.user.id");
  const result = await getMyOrdersFromDB(req.user.id, req.user.email);

  if (!result.length) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
    return;
  }
  sendResponse(res, {
    message: "User Orders retrieved successfully",
    data: result,
  });
});
