import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
  updateProductById,
} from "./product.controller";
import { productValidationSchema } from "./product.validation";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(productValidationSchema),
  createProduct
);
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.put("/:id", auth("admin"), updateProductById);
router.delete("/:id", auth("admin"), deleteProductById);

export const productRouter = router;
