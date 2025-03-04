import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { productRouter } from "../modules/product/product.route";
import { orderRouter } from "../modules/order/order.route";
import { categoryRouter } from "../modules/category/category.route";
import { paymentRoutes } from "../modules/payment/payment.route";
import { inventoryRouter } from "../modules/inventory/inventory.route";

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
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/orders",
    route: orderRouter,
  },
  {
    path: "/inventory",
    route: inventoryRouter,
  },
];

moduleRoutes?.forEach((route) => router.use(route.path, route.route));

export default router;
