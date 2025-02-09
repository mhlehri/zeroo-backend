import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import config from "./app/config";
import axios from "axios";

const app: Application = express();
const api = config.appApi;
const secret = config.stripeSecretKey;
app.use(cors({ origin: `${api}`, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to the API",
  });
});
app.post("/payment", async (req, res, next) => {
  const { cus_email, cus_name, cus_phone, amount, desc, currency } = req.body;
  console.log(req.body);
  //Fill formData with your own data
  const formData = {
    cus_name: "rayhan",
    cus_email: "r@gmail.com",
    cus_phone: "01767766789",
    amount: 10,
    store_id: "aamarpaytest",
    tran_id: Math.floor(Math.random() * 10000),
    success_url: "http://localhost:3000/complete",
    fail_url: "http://localhost:3000/checkout",
    cancel_url: "http://localhost:3000/checkout",
    currency: "BDT",
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    desc: "Description",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "0",
    cus_country: "Bangladesh",
    type: "json",
  };
  const { data } = await axios.post(
    "https://sandbox.aamarpay.com/jsonpost.php",
    formData
  );
  if (data.result !== "true") {
    let errorMessage = "";
    for (let key in data) {
      errorMessage += data[key] + ". ";
    }
    return res.render("error", {
      title: "Error",
      errorMessage,
    });
  }
  res.status(200).json({ payment_url: data.payment_url });
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
