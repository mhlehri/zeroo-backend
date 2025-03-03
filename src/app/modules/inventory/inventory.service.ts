import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TInventory } from "./inventory.interface";
import Inventory from "./inventory.model";

const name = "inventory";

export const addSizeIntoDB = async (size: string): Promise<TInventory> => {
  const result = await Inventory.findOne({ name: name });
  console.log(result, "result");
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
        sizes: [...result.sizes ,size],
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
  const inventory = new Inventory({ tags: [tag] });
  return inventory.save();
}
