import { Schema, model } from "mongoose";
import { TReview } from "./reviews.interface";

const ReviewSchema: Schema = new Schema({
  productId: { type: String, required: true, ref: "Product" },
  userId: { type: String, required: true, ref: "User" },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  isShown: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

const Review = model<TReview>("Review", ReviewSchema);

export default Review;
