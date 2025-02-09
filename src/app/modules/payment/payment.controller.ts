import catchAsync from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";

const confirmation = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await paymentServices.confirmationBooking(
    transactionId as string,
    status as string
  );
  res.send(result);
});

export const PaymentController = {
  confirmation,
};
