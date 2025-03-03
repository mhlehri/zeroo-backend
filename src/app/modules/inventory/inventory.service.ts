import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TReview } from "./inventory.interface";
import Review from "./reviews.model";

//? service for creating slot
export const createReviewIntoDB = async (data: TReview) => {
  const { productId, userId } = data;

  const alreadyExists = await Review.findOne({ userId, productId });

  if (alreadyExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already reviewed this product"
    );
  }

  const res = await Review.create(data);
  if (!res) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to Create Review");
  }
  return res;
};

//? service for getting all available slots
export const getReviewsFromDB = async (productId?: string) => {
  const queryObj: Partial<TReview> = {
    isDeleted: false,
  };

  if (productId) {
    queryObj.productId = productId;
  }
  // console.log(queryObj);
  const res = await Review.find(queryObj).populate("product user");
  return res;
};

//? service for deleting slot by id
export const deleteReviewByIdFormDB = async (id: string) => {
  const found = await Review.findById(id);
  if (found?.isDeleted)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, `Review is already deleted`);

  const res = await Review.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    {
      new: true,
    }
  );
  return res;
};

//? update review isShown by id
export const updateReviewIsShownIntoDB = async (
  id: string,
  isShown: boolean
) => {
  const found = await Review.findById(id);
  if (!found) throw new AppError(httpStatus.NOT_FOUND, `Review not found`);
  const res = await Review.findByIdAndUpdate(
    { _id: id },
    { isShown },
    {
      new: true,
    }
  );
  return res;
};
