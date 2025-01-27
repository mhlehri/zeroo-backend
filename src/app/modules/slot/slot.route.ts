import { Router } from "express";
import {
  createSlot,
  deleteSlotById,
  getAllSlots,
  getSlotsAvailability,
} from "./slot.controller";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import SlotValidationSchema from "./slot.validation";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(SlotValidationSchema),
  createSlot
);
router.get("/availability", getSlotsAvailability);
router.get("/", auth("admin"), getAllSlots);
router.delete("/:id", auth("admin"), deleteSlotById);

export const slotRouter = router;
