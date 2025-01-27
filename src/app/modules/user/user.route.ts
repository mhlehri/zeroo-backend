import { Router } from "express";
import { createUser, getUser } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidationSchema, userValidationSchema } from "./user.validation";

const router = Router();

router.post("/signup", validateRequest(userValidationSchema), createUser);
router.post("/login", validateRequest(loginValidationSchema), getUser);
export const userRouter = router;
