import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const CategorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
    image: {
      type: String,
      required: true,
    },
    subCategories: {
      type: [
        {
          name: { type: String, required: true },
          isPublished: { type: Boolean, default: true },
          isDeleted: { type: Boolean, default: false },
        },
      ],
      required: false,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category = model<TCategory>("Category", CategorySchema);

export default Category;

