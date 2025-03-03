import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  addSize,
  addTag,
  deleteSize,
  deleteTag,
  getSize,
  getTag,
  updateSize,
  updateTag
} from "./inventory.controller";
import InventoryValidationSchema from "./inventory.validation";

const router = Router();

router.post(
  "/tag",
  auth("admin"),
  validateRequest(InventoryValidationSchema),
  addTag
);
router.post(
  "/size",
  auth("admin"),
  validateRequest(InventoryValidationSchema),
  addSize
);
router.get("/tag", auth("admin"), getTag);
router.get("/size", auth("admin"), getSize);
router.put("/tag",auth("admin"), updateTag);
router.put("/size",auth("admin"), updateSize);
router.delete("/tag", auth("admin"), deleteTag);
router.delete("/size", auth("admin"), deleteSize);

export const inventoryRouter = router;
