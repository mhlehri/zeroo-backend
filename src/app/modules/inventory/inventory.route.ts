import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  addSize,
  addTag,
  deleteTag,
  
  updateReviewIsShown
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
router.get("/tag", );
router.get("/size", getInventories);
router.delete("/:id", auth("user", "admin"), deleteTag);
router.put("/:id", auth("admin"), updateReviewIsShown);

export const reviewRouter = router;
