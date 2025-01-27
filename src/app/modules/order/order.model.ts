import { Schema, model } from "mongoose";
import { TBooking } from "./order.interface";

const bookingSchema = new Schema<TBooking>({
  room: { type: String, ref: "Room" },
  slots: [{ type: String, ref: "Slot" }],
  user: { type: String, ref: "User" },
  totalAmount: Number,
  date: { type: String },
  isConfirmed: { type: String, default: "unconfirmed" },
  isDeleted: { type: Boolean, default: false },
});

const Booking = model<TBooking>("Booking", bookingSchema);

export default Booking;
