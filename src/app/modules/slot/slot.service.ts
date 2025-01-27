import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
import Slot from "./slot.model";

//? service for creating slot
export const createSlotIntoDB = async (data: TSlot) => {
  const { room, date, startTime, endTime } = data;

  const alreadyExists = await Slot.findOne({ room, date });

  if (alreadyExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Slot Already Exists on this Date for this Room"
    );
  }

  const duration = 60;

  const toMin = (time: string) => parseInt(time.split(":")[0], 10) * duration;

  const minToTime = (minutes: number) => {
    const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mins = String(minutes % 60).padStart(2, "0");
    return `${hours}:${mins}`;
  };

  const startMin = toMin(startTime);
  const endMin = toMin(endTime);

  for (let time = startMin; time < endMin; time += duration) {
    await Slot.create({
      startTime: minToTime(time),
      endTime: minToTime(time + duration),
      date,
      room,
    });
  }

  const res = await Slot.find({ room });
  if (!res) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to Create Slot");
  }
  return res;
};

//? service for getting all available slots
export const getSlotsAvailabilityFromDB = async (
  query: Partial<{ date: string; roomId: string }>
) => {
  const queryObj: Partial<TSlot> = {
    isBooked: false,
    isDeleted: false,
  };
  if (query.date) {
    queryObj.date = query.date;
  }
  if (query.roomId) {
    queryObj.room = query.roomId;
  }
  // console.log(queryObj);
  const res = await Slot.find(queryObj).populate("room");
  return res;
};
//? service for getting all slots
export const getAllSlotsFromDB = async () => {
  // console.log(queryObj);
  const res = await Slot.find({
    isDeleted: false,
  })
    .sort({ date: -1 })
    .populate("room");
  return res;
};

//? service for deleting slot by id
export const deleteSlotByIdFormDB = async (id: string) => {
  const found = await Slot.findById(id);
  if (found?.isDeleted)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, `Slot is already deleted`);

  const res = await Slot.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    {
      new: true,
    }
  );
  return res;
};
