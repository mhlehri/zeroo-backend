import { z } from "zod";

export const userValidationSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({
      message: "Email is required",
    })
    .email("Invalid email"),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  phone: z.string({
    message: "phone is required",
  }),
  address: z.string({
    message: "Address is required",
  }),
  role: z.enum(["admin", "user"]).default("user"),
});

export const loginValidationSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email("Invalid email"),
  password: z.string({
    message: "Password is missing",
  }),
});
