import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import Product from "./product.model";

//? service for adding Product
export const createProductIntoDB = async (data: TProduct) => {
  const res = await Product.create(data);
  return res;
};

//?   service for getting all products
interface ProductFilters {
  searchTerm?: string;
  FCategory?: string;
  priceFilter?: number;
  sortOrder?: "asc" | "desc" | "new";
}

export const getAllProductsFromDB = async (
  filters: ProductFilters,
  page: number,
  limit: number
): Promise<{ products: TProduct[]; total: number }> => {
  const { searchTerm, FCategory, priceFilter, sortOrder } = filters;

  // Build the query object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {
    isDeleted: false,
  };

  if (searchTerm) {
    query.name = { $regex: searchTerm, $options: "i" };
  }

  if (FCategory) {
    query.category = { $regex: FCategory, $options: "i" };
  }

  if (priceFilter) {
    query.price = { $lte: priceFilter }; // Filter by maximum price
  }

  // Sorting
  const sort: { [key: string]: 1 | -1 } =
    sortOrder === "asc"
      ? { price: 1 }
      : sortOrder === "desc"
      ? { price: -1 }
      : sortOrder === "new"
      ? { createdAt: -1 }
      : { createdAt: -1 };

  // Pagination
  const skip = (page - 1) * limit;

  limit = sortOrder === "new" ? 10 : limit;

  const products = await Product.find(query).sort(sort).skip(skip).limit(limit);
  const total = await Product.countDocuments(query);
  return { products, total };
};

//? service for getting Product by name
export const getProductByIdFromDB = async (id: string) => {
  const res = await Product.findById(id);
  return res;
};

//? service for updating Product by id
export const updateProductByIdIntoDB = async (
  id: string,
  data: Partial<TProduct>
) => {
  const res = await Product.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return res;
};

//? service for deleting Product by id
export const deleteProductByIdFormDB = async (id: string) => {
  console.log(id, "id");
  const found = await Product.findById(id);
  console.log(found, "found");
  if (found?.isDeleted)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, `Product is already deleted`);

  const res = await Product.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    {
      new: true,
    }
  );
  return res;
};
