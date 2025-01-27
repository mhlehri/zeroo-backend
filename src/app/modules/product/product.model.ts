import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = model<TProduct>("Product", ProductSchema);

export default Product;
