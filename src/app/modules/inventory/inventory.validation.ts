import { z } from "zod";

const InventoryValidationSchema = z.object({
  sizes : z.array(z.string()),
  colors : z.array(z.string()),
  tags: z.array(z.string()),
});

export default InventoryValidationSchema;
