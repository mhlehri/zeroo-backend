import { Schema, model } from "mongoose";
import { TInventory } from "./inventory.interface";

const InventorySchema: Schema = new Schema({
  name: {
    type: String, required: true, unique: true
  },
  items: {
    type: Array, required: true,
    default: []
  }
});

const Inventory = model<TInventory>("Inventory", InventorySchema);

export default Inventory;
