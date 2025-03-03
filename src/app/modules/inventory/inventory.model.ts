import { Schema, model } from "mongoose";
import { TInventory } from "./inventory.interface";

const InventorySchema: Schema = new Schema({
  name: {
    type: String, required: true,
    default: "inventory"
  },
  sizes: {
    type: [String],
    required: true,
    default: [],
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
});

const Inventory = model<TInventory>("Inventory", InventorySchema);

export default Inventory;
