import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  description: z.string({
    message: "Description is required",
  }),
  category: z.string({
    message: "Category is required",
  }),
  stock: z
    .number({
      message: "Stock quantity is required",
    })
    .int("Stock must be an integer"),
  price: z
    .number({
      message: "Price is required",
    })
    .nonnegative("Price must be a non-negative number"),
  images: z.array(
    z.string({
      message: "images are required",
    })
  ),
  isDeleted: z.boolean().default(false).optional(),
});
