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
} from "./inventory.controller";

const router = Router();


router.get("/tag", auth("admin"), getTag);
router.get("/size", auth("admin"), getSize);
router.put("/tag",auth("admin"), addTag);
router.put("/size",auth("admin"), addSize);
router.delete("/tag", auth("admin"), deleteTag);
router.delete("/size", auth("admin"), deleteSize);

export const inventoryRouter = router;
