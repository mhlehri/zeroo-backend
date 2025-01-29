import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  image: z.string(),
  isDeleted: z.boolean().default(false).optional(),
});
