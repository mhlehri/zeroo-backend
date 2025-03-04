import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  addSubCategoryToCategory,
  createCategory,
  getAllCategory,
  getCategoryById,
  unpublishCategoryById,
  updateCategoryById,
} from "./category.controller";
import {
  categoryValidationSchema,
  subCategoryValidationSchema,
} from "./category.validation";

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
router.post(
  "/sub-categories",
  auth("admin"),
  validateRequest(subCategoryValidationSchema),
  addSubCategoryToCategory
);
router.put("/:id", auth("admin"), unpublishCategoryById);

export const categoryRouter = router;
