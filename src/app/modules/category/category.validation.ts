import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  subCategories: z
    .array(
      z.object({
        name: z.string({
          message: "Name is required",
        }),
        image: z.string(),
        isPublished: z.boolean().default(false),
        isDeleted: z.boolean().default(false),
      })
    )
    .optional(),
  isPublished: z.boolean().default(false),
  image: z.string(),
  isDeleted: z.boolean().default(false).optional(),
});
