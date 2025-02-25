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
        isPublished: z.boolean().default(true).optional(),
        isDeleted: z.boolean().default(false).optional(),
      })
    )
    .optional(),
  image: z.string({
    message: "Image is required",
  }),
  isDeleted: z.boolean().default(false).optional(),
});

export const subCategoryValidationSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  categoryId: z.string({
    message: "Category ID is required",
  }),
  isPublished: z.boolean().default(true).optional(),
  isDeleted: z.boolean().default(false).optional(),
});
