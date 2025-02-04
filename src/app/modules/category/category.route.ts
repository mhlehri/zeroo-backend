import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
} from "./category.controller";
import { categoryValidationSchema } from "./category.validation";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(categoryValidationSchema),
  createCategory
);
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.put("/:id", auth("admin"), updateCategoryById);
router.delete("/:id", auth("admin"), deleteCategoryById);

export const categoryRouter = router;
