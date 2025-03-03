import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createReview,
  deleteReviewById,
  getReviews,
  updateReviewIsShown,
} from "./inventory.controller";
import InventoryValidationSchema from "./inventory.validation";

const router = Router();

router.post(
  "/:id",
  auth("user"),
  validateRequest(InventoryValidationSchema),
  createReview
);
router.get("/:id", getReviews);
router.delete("/:id", auth("user", "admin"), deleteReviewById);
router.put("/:id", auth("admin"), updateReviewIsShown);

export const reviewRouter = router;
