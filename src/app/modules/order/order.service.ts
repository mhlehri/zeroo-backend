import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Room from "../product/product.model";
import { TBooking } from "./order.interface";
import Booking from "./order.model";
import Slot from "../slot/slot.model";
import User from "../user/user.model";

//? service for adding booking
export const addBookingIntoDB = async (data: Partial<TBooking>) => {
  //? check if room exists
  const isRoomExists = await Room.findOne({ _id: data.room, isDeleted: false });
  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found!");
  }

  //? total amount calculation
  const totalAmount = isRoomExists!.pricePerSlot * data.slots!.length;

  //? update bookings is available
  for (let index = 0; index < data.slots!.length; index++) {
    const re = await Slot.findOneAndUpdate(
      { _id: data.slots![index], isBooked: false },
      {
        isBooked: true,
      },
      {
        new: true,
      }
    );
    if (!re) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Slot \`${data.slots![index]}\` not found or is already booked`
      );
    }
  }

  //? check if user exists
  const isUserExists = await User.exists({ _id: data.user });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  const res = (await Booking.create({ totalAmount, ...data })).populate(
    "room slots user"
  );

  return res;
};

//? service for updating booking
export const updateBookingIntoDB = async (
  id: string,
  data: Partial<TBooking>
) => {
  const res = await Booking.findByIdAndUpdate(id, data, { new: true });
  return res;
};

//? service for deleting booking
export const deleteBookingFromDB = async (id: string) => {
  const res = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return res;
};

//? service for getting my bookings (user bookings)
export const getMyBookingsFromDB = async (id: string) => {
  const res = await Booking.find({ user: id })
    .sort({
      date: -1,
    })
    .populate("room slots user");

  return res;
};

//? service for getting all bookings
export const getAllBookingsFromDB = async () => {
  const res = await Booking.find({
    isDeleted: false,
  })
    .sort({
      date: -1,
    })
    .populate("room slots user");

  return res;
};
