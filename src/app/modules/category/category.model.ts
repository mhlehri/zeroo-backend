import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const CategorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category = model<TCategory>("Category", CategorySchema);

export default Category;
