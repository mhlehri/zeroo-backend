import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import config from "./app/config";

const app: Application = express();
const api = config.appApi;
const secret = config.stripeSecretKey;
app.use(cors({ origin: api, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to the API",
  });
});

const stripe = new Stripe(secret as string, {
  apiVersion: "2024-12-18.acacia",
});

app.post("/create-checkout-session", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
