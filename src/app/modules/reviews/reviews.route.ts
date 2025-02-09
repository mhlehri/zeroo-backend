import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createReview,
  deleteReviewById,
  getReviews,
  updateReviewIsShown,
} from "./reviews.controller";
import ReviewValidationSchema from "./reviews.validation";

const router = Router();

router.post(
  "/:id",
  auth("user"),
  validateRequest(ReviewValidationSchema),
  createReview
);
router.get("/:id", getReviews);
router.delete("/:id", auth("user", "admin"), deleteReviewById);
router.put("/:id", auth("admin"), updateReviewIsShown);

export const reviewRouter = router;
