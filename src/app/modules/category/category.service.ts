import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import Category from "./category.model";

//? service for adding Category
export const createCategoryIntoDB = async (data: TCategory) => {
  const res = await Category.create(data);
  return res;
};

export const getAllCategoriesFromDB = async () => {
  const categories = await Category.find({
    isDeleted: false,
  });

  const result = await Category.countDocuments();
  return { categories, total: result };
};

//? service for getting Category by id
export const getCategoryByIdFromDB = async (id: string) => {
  const res = await Category.findById(id);
  return res;
};

//? service for updating Category by id
export const updateCategoryByIdIntoDB = async (
  id: string,
  data: Partial<TCategory>
) => {
  const res = await Category.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return res;
};

//? service for deleting Category by id
export const deleteCategoryByIdFormDB = async (id: string) => {
  const found = await Category.findById(id);
  if (found?.isDeleted)
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      `Category is already deleted`
    );

  const res = await Category.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    {
      new: true,
    }
  );
  return res;
};
