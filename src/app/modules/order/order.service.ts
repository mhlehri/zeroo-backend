import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import AppError from "../../errors/AppError";
import { initiatePayment } from "../../utils/payment";
import Product from "../product/product.model";
import { TOrder } from "./order.interface";
import Order from "./order.model";

//? service for adding Order
export const addOrderIntoDB = async (data: Partial<TOrder>) => {
  console.log(data, "data");
  //? update Orders is available
  for (let index = 0; index < data.products!.length; index++) {
    const re = await Product.findOne({
      _id: data.products![index].product,
      isDeleted: false,
    });

    if (!re) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product \`${data.products![index].product}\` not found`
      );
    }
    if (re?.stock < data.products![index].quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Product \`${data.products![index].product}\` is out of stock`
      );
    }
  }
  console.log(data, "data");

  if (data.paymentMethod === "online") {
    const transactionId = uuidv4();
    data.transactionId = transactionId;

    const paymentSession = await initiatePayment({
      transactionId,
      totalPrice: data.totalAmount!,
      customerName: data.name!,
      customerAddress: data.address!,
      customerEmail: data.email!,
      customerPhone: data.phone!,
    });
    console.log(paymentSession, "paymentSession");
    if (!paymentSession) {
      throw new AppError(500, "Failed to initiate payment");
    }
    const res = await (
      await Order.create(data)
    ).populate({
      path: "products.product",
    });
    if (!res) {
      throw new AppError(500, "Failed to place order");
    }
    // Update product quantities after order creation
    for (const orderProduct of data.products!) {
      await Product.findByIdAndUpdate(orderProduct.product, {
        $inc: { stock: -orderProduct.quantity },
      });
    }
    return paymentSession;
  } else {
    const res = await (
      await Order.create(data)
    ).populate({
      path: "products.product",
    });
    if (!res) {
      throw new AppError(500, "Failed to place order");
    }
    // Update product quantities after order creation
    for (const orderProduct of data.products!) {
      await Product.findByIdAndUpdate(orderProduct.product, {
        $inc: { stock: -orderProduct.quantity },
      });
    }
    return res;
  }

  // Create the order
};

//? service for updating Order
export const updateOrderIntoDB = async (id: string, data: Partial<TOrder>) => {
  const res = await Order.findByIdAndUpdate(id, data, { new: true });
  return res;
};

//? service for deleting Order
export const deleteOrderFromDB = async (id: string) => {
  const res = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return res;
};

//? service for getting my Orders (user Orders)
export const getMyOrdersFromDB = async (id: string, email: string) => {
  const query: {
    user?: string;
    email?: string;
  } = {};
  if (id) {
    query["user"] = id;
  }
  if (email) {
    query["email"] = email;
  }
  const res = await Order.find(query)
    .sort({
      date: -1,
    })
    .populate("products.product user");

  return res;
};

//? service for getting all Orders
export const getAllOrdersFromDB = async (query: { today?: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {
    isDeleted: false,
  };

  if (query.today) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    filter.createdAt = {
      $gte: today,
      $lt: tomorrow,
    };
  }

  const orders = await Order.find(filter)
    .sort({
      createdAt: -1,
    })
    .populate("products.product");
  const total = await Order.countDocuments(filter);

  return { orders, total };
};
