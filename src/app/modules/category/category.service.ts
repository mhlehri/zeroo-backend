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
  name: string
) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  // Initialize subCategories if undefined
  if (!category.subCategories) {
    category.subCategories = [];
  }

  // Check if the subcategory already exists
  const subCategoryExists = category.subCategories.some(
    (subCat) => subCat.name.toLowerCase() === name.toLowerCase()
  );

  if (subCategoryExists) {
    throw new AppError(httpStatus.CONFLICT, "Subcategory already exists");
  }

  // Use $addToSet to avoid duplicates and ensure subCategories exists
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        subCategories: {
          name,
          isPublished: true,
          isDeleted: false,
        },
      },
    },
    { new: true }
  );

  return updatedCategory;
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
