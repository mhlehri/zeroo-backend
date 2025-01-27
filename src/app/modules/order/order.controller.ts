import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  addBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
} from "./order.service";
import AppError from "../../errors/AppError";

//? This function is used to handle the request to get all bookings
export const getAllBookings = catchAsync(async (req, res) => {
  const result = await getAllBookingsFromDB();

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
    message: "All bookings retrieved successfully",
    data: result,
  });
});

//? This function is used to handle the request to add a booking
export const addBooking = catchAsync(async (req, res) => {
  const result = await addBookingIntoDB(req.body);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to add booking");
  }

  sendResponse(res, {
    message: "Booking added successfully",
    data: result,
  });
});

//? This function is used to handle the request to update a booking
export const updateBooking = catchAsync(async (req, res) => {
  //   console.log(req.params.id, "req.params.id");
  const result = await updateBookingIntoDB(req.params.id, req.body);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking update failed");
  }
  sendResponse(res, {
    message: "Booking updated successfully",
    data: result,
  });
});

//? This function is used to handle the request to delete a booking
export const deleteBooking = catchAsync(async (req, res) => {
  const result = await deleteBookingFromDB(req.params.id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking delete failed");
  }
  sendResponse(res, {
    message: "Booking deleted successfully",
    data: result,
  });
});

//? This function is used to handle the request to get my bookings
export const getMyBookings = catchAsync(async (req, res) => {
  //   console.log(req.user, "req.user.id");
  const result = await getMyBookingsFromDB(req.user.id);

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
    message: "User bookings retrieved successfully",
    data: result,
  });
});
