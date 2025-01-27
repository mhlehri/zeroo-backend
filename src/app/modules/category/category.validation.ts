import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  isDeleted: z.boolean().default(false).optional(),
});
