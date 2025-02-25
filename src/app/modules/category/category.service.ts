import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory, TSubCategory } from "./category.interface";
import Category from "./category.model";

//? service for adding Category
export const createCategoryIntoDB = async (data: TCategory) => {
  const res = await Category.create(data);
  return res;
};

export const getAllCategoriesFromDB = async () => {
  const query = {
    isDeleted: false,
  };

  const categories = await Category.find(query);
  const total = await Category.countDocuments(query);

  return { categories, total };
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

//? service for adding sub category
export const addSubCategoryToCategoryIntoDB = async (
  id: string,
  subCategory: TSubCategory
) => {
  const found = await Category.findById(id);
  if (!found) throw new AppError(httpStatus.NOT_FOUND, "Category not found");

  // Initialize subCategories array if it doesn't exist
  if (!found.subCategories) {
    found.subCategories = [];
  }

  const index = found.subCategories.findIndex(
    (subCat) => subCat.name === subCategory.name
  );

  if (index === -1) {
    found.subCategories.push(subCategory);
  } else {
    found.subCategories[index] = subCategory;
  }

  const res = await found.save();
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
