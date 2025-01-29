import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUser,
} from "./user.controller";
import { loginValidationSchema, userValidationSchema } from "./user.validation";

const router = Router();

router.post("/signup", validateRequest(userValidationSchema), createUser);
router.post("/login", validateRequest(loginValidationSchema), getUser);
router.get("/users", auth("admin"), getAllUsers);
router.delete("/:id", auth("admin"), deleteUserById);
export const userRouter = router;
