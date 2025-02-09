export type OrderStatus =
  | "confirmed"
  | "unconfirmed"
  | "rejected"
  | "cancelled"
  | "delivered";

export type TOrder = {
  user: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  transactionId: string;
  paymentStatus: "paid" | "pending" | "failed";
  paymentMethod: "online" | "cash";
  products: {
    product: string;
    quantity: number;
  }[];
  totalAmount: number;
  orderStatus: OrderStatus;
  isDeleted: boolean;
};
