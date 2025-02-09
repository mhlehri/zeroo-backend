import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    user: { type: String, ref: "User" },
    products: {
      type: [
        {
          product: { type: String, ref: "Product" },
          quantity: { type: Number, default: 1 },
        },
      ],
    },
    transactionId: { type: String },
    paymentMethod: { type: String, enum: ["online", "cash"], default: "cash" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    orderStatus: { type: String, default: "unconfirmed" },
    totalAmount: { type: Number },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = model<TOrder>("order", orderSchema);

export default Order;
