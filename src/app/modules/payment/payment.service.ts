import { join } from "path";
import AppError from "../../errors/AppError";
import { readFileSync } from "fs";
import Order from "../order/order.model";
import { verifyPayment } from "../../utils/payment";

const confirmationBooking = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  if (!verifyResponse) {
    throw new AppError(500, "Payment verification failed");
  }

  let paymentStatus = "failed";
  let message = "";

  if (verifyResponse.pay_status === "Successful") {
    paymentStatus = "paid";

    const order = await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus },
      { new: true }
    );
    console.log(order, "order");
  }

  if (verifyResponse.pay_status !== "Successful") {
    await Order.findOneAndUpdate({ transactionId }, { paymentStatus });
  }

  message =
    paymentStatus === "paid" ? "Payment Successful." : "Payment Failed!";

  const filePath = join(__dirname, "../../views/confirmation.html");

  let template = readFileSync(filePath, "utf-8");
  template = template.replace("{{message}}", message);

  return template;
};

export const paymentServices = {
  confirmationBooking,
};
