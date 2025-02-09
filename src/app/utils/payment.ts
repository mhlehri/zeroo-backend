import axios from "axios";
import config from "../config";
import AppError from "../errors/AppError";

export type TPaymentData = {
  transactionId: string;
  totalPrice: number;
  customerName: string;
  customerAddress: string; // Fixed the typo in "customerAddres"
  customerEmail: string;
  customerPhone?: string;
};

export const initiatePayment = async (paymentData: TPaymentData) => {
  try {
    const response = await axios.post(
      "https://sandbox.aamarpay.com/jsonpost.php",
      {
        store_id: "aamarpaytest",
        signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
        tran_id: paymentData.transactionId,
        success_url: `${config.server_url}/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
        fail_url: `${config.server_url}/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=failed`,
        cancel_url: config.appApi,
        amount: paymentData.totalPrice,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: paymentData.customerEmail,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "Bangladesh",
        cus_phone: paymentData.customerPhone,
        type: "json",
      }
    );

    return response.data;
  } catch (error) {
    throw new AppError(500, "Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(
      `https://sandbox.aamarpay.com/api/v1/trxcheck/request.php`,
      {
        params: {
          store_id: "aamarpaytest",
          signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
          type: "json",
          request_id: tnxId,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new AppError(500, "Payment verification failed!");
  }
};
