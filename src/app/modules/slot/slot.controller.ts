import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createSlotIntoDB,
  deleteSlotByIdFormDB,
  getAllSlotsFromDB,
  getSlotsAvailabilityFromDB,
} from "./slot.service";
import { RequestHandler } from "express";
import AppError from "../../errors/AppError";

//? This function is used to handle the request to create a slot
export const createSlot = catchAsync(async (req, res) => {
  const result = await createSlotIntoDB(req.body);
  // console.log(result);

  sendResponse(res, {
    message: "Slots created successfully",
    data: result,
  });
});

//? This function is used to handle the request to get all available slots
export const getSlotsAvailability = catchAsync(async (req, res) => {
  const result = await getSlotsAvailabilityFromDB(req.query);
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
    message: "Available slots retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to get all slots
export const getAllSlots = catchAsync(async (req, res) => {
  const result = await getAllSlotsFromDB();
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
    message: "All slots retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to delete a slot by id
export const deleteSlotById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await deleteSlotByIdFormDB(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete");
  }

  sendResponse(res, {
    message: "Slot deleted successfully",
    data: result,
  });
});
