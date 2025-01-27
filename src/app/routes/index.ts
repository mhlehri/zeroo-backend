import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { productRouter } from "../modules/product/product.route";
import { slotRouter } from "../modules/slot/slot.route";
import { bookingRouter } from "../modules/order/order.route";
import { categoryRouter } from "../modules/category/category.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRouter,
  },
  {
    path: "/products",
    route: productRouter,
  },
  {
    path: "/category",
    route: categoryRouter,
  },
  {
    path: "/slots",
    route: slotRouter,
  },
  {
    path: "/",
    route: bookingRouter,
  },
];

moduleRoutes?.forEach((route) => router.use(route.path, route.route));

export default router;
