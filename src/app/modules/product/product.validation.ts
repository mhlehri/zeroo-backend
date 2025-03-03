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
  subCategory: z.string().optional(),
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
  discountPrice: z.number().optional(),
  discountType: z.string().optional(),
  sku: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(z.object({})).optional(),
  isPublished: z.boolean().default(true).optional(),
  images: z.array(
    z.string({
      message: "images are required",
    })
  ),
});
