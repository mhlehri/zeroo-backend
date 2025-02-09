import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post("/confirmation", PaymentController.confirmation);

export const paymentRoutes = router;
