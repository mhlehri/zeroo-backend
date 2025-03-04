import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    discountType: {
      type: String,
      enum: ["percentage", "amount", ""],
      default: "percentage",
    },
    sku: { type: String },
    tags: { type: [String] },
    variants: {
      type: [
        {
          size: { type: String },
          stock: { type: Number },
        },
      ],
    },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, default: "" },
    isPublished: { type: Boolean, default: true },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

const Product = model<TProduct>("Product", ProductSchema);

export default Product;
