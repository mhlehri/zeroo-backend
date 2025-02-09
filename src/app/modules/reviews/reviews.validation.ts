import { z } from "zod";

const ReviewValidationSchema = z.object({
  productId: z.string(),
  userId: z.string().optional(),
  rating: z.number(),
  comment: z.string(),
  isShown: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export default ReviewValidationSchema;
