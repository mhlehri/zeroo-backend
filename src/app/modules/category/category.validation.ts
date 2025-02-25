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
        isPublished: z.boolean().default(false).optional(),
        isDeleted: z.boolean().default(false).optional(),
      })
    )
    .optional(),
  isPublished: z.boolean().default(false).optional(),
  image: z.string({
    message: "Image is required",
  }),
  isDeleted: z.boolean().default(false).optional(),
});
