import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createUserIntoDB,
  deleteUserByIdFormDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  getUserFromDB,
  updateUserByIdIntoDB,
} from "./user.service";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

//? This function is used to handle the request to create a user
export const createUser = catchAsync(async (req, res) => {
  const result = await createUserIntoDB(req.body);
  sendResponse(res, {
    message: "User registered successfully",
    data: result,
  });
});

//? This function is used to handle the request to get a user
export const getUser = catchAsync(async (req, res) => {
  const result = await getUserFromDB(req.body);
  res
    .cookie("token", result?.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      statusCode: 200,
      message: "Logged in successfully",
      token: result?.token,
      data: result?.result,
    });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const result = await getAllUsersFromDB();
  res.json({
    success: true,
    statusCode: 200,
    message: "User retrieved successfully",
    data: result,
  });
});

export const deleteUserById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await deleteUserByIdFormDB(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete");
  }

  sendResponse(res, {
    message: "User deleted successfully",
    data: result,
  });
});
export const getUserById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getUserByIdFromDB(id);

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
    message: "User retrieved successfully",
    data: result,
  });
});

export const updateUserById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateUserByIdIntoDB(id, data);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update");
  }

  sendResponse(res, {
    message: "User updated successfully",
    data: result,
  });
});
