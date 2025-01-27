import { z } from "zod";

export const bookingValidationSchema = z.object({
  room: z.string({
    message: "Room reference is required",
  }),
  slots: z.array(
    z.string({
      message: "Slot reference is required",
    })
  ),
  user: z.string({
    message: "User reference is required",
  }),
  totalAmount: z
    .number()
    .nonnegative("Total amount must be a non-negative number")
    .optional(),
  date: z.string({
    message: "Date is required",
  }),
  isConfirmed: z
    .enum(["confirmed", "unconfirmed", "canceled"])
    .default("unconfirmed"),
  isDeleted: z.boolean().default(false),
});
