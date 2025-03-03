import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TInventory } from "./inventory.interface";
import Review from "./inventory.model";

//? service for creating slot
export const createReviewIntoDB = async (data: TInventory) => {
  
};

//? service for getting all available slots
export const getReviewsFromDB = async (productId?: string) => {


};

//? service for deleting slot by id
export const deleteReviewByIdFormDB = async (id: string) => {
  
};

//? update review isShown by id
export const updateReviewIsShownIntoDB = async (
  id: string,
  isShown: boolean
) => {
  
};
