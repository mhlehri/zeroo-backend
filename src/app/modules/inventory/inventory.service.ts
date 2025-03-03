import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TInventory } from "./inventory.interface";
import Inventory from "./inventory.model";

const name = "inventory";

export const addSizeIntoDB = async (size: string): Promise<TInventory> => {
  const result = await Inventory.findOne({ name: name });
  // console.log(result, "result");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Inventory not found");
  }

  if (result.sizes.includes(size)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Size already exists");
  }
  const addedSize = await Inventory.findOneAndUpdate(
    { name: name },
    {
      $addToSet: {
        sizes: size,
      },
    },
    { new: true }
  );
  if (!addedSize) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to add size");
  }
  return addedSize;
}
 
export const addTagIntoDB = async (tag: string): Promise<TInventory> => {
  const result = await Inventory.findOne({ name: name });
  // console.log(result, "result");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Inventory not found");
  }

  if (result.tags.includes(tag)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Tag already exists");
  }
  const addedTag = await Inventory.findOneAndUpdate(
    { name: name },
    {
      $addToSet: {
        tags: tag,
      },
    },
    { new: true }
  );
  if (!addedTag) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to add tag");
  }
  return addedTag;
}

export const getTagsFromDB = async (): Promise<string[]> => {
  const result = await Inventory.findOne
    ({ name
    });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Inventory not found");
  }
  return result.tags;
}

export const getSizesFromDB = async (): Promise<string[]> => {
  const result = await Inventory.findOne
    ({ name
    });
  if (!result) {  
    throw new AppError(httpStatus.NOT_FOUND, "Inventory not found");
  }   
  return result.sizes;
}

export const deleteTagFromDB = async (tag: string): Promise<TInventory> => {
  const result = await Inventory.findOne({ name: name
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Inventory not found");
  }
  if (!result.tags.includes(tag)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Tag not found");
  }
  const deletedTag = await Inventory.findOneAndUpdate(
    { name: name },
    {
      $pull: {
        tags: tag,
      },
    },
    { new: true }
  );
  if (!deletedTag) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to delete tag");
  }
  return deletedTag;  
}

export const deleteSizeFromDB = async (size: string): Promise<TInventory> => {
  const result = await Inventory.findOne({ name: name
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Inventory not found");
  }
  if (!result.sizes.includes(size)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Size not found");
  }
  const deletedSize = await Inventory.findOneAndUpdate(
    { name: name },
    {
      $pull: {
        sizes: size,
      },
    },
    { new: true }
  );
  if (!deletedSize) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to delete size");
  }
  return deletedSize;
}