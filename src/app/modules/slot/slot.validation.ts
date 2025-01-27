import { z } from "zod";

const SlotValidationSchema = z.object({
  room: z.string({
    message: "Room is required",
  }),
  date: z.string({
    message: "Date is required",
  }),
  startTime: z.string({
    message: "Start time is required",
  }),
  endTime: z.string({
    message: "End time is required",
  }),
  isBooked: z.boolean().optional(),
});

export default SlotValidationSchema;
