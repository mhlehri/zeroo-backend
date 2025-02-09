import { z } from "zod";

export const ordersValidationSchema = z.object({
  user: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  transactionId: z.string().optional(),
  products: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().default(1),
    })
  ),
  paymentMethod: z.enum(["online", "cash"]).default("cash"),
  paymentStatus: z.enum(["paid", "pending", "failed"]).default("pending"),
  totalAmount: z.number({
    message: "Total amount is required",
  }),
  status: z
    .enum(["confirmed", "unconfirmed", "canceled", "delivered", "rejected"])
    .default("unconfirmed"),
  isDeleted: z.boolean().default(false),
});
