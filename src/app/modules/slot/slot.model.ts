import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const SlotSchema: Schema = new Schema({
  room: { type: String, required: true, ref: "Room" },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

const Slot = model<TSlot>("Slot", SlotSchema);

export default Slot;
