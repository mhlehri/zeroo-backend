import { Router } from "express";
import { auth } from "../../middlewares/auth";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  updateOrder,
} from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ordersValidationSchema } from "./order.validation";

const router = Router();

router.get("/", auth("admin"), getAllOrders);
router.post("/", validateRequest(ordersValidationSchema), addOrder);
router.put("/:id", auth("admin"), updateOrder);
router.delete("/:id", auth("admin"), deleteOrder);
router.get("/my-orders", auth("user"), getMyOrders);

export const orderRouter = router;
