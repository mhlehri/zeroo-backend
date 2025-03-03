export type TProduct = {
  name: string;
  images: string[];
  price: number;
  discountPrice?: number | null;
  discountType?: "percentage" | "amount" | "";
  sku?: string;
  description: string;
  category: string;
  subCategory: string;
  stock: number;
  tags?: string[];
  variants: TProductVariant[];
  isPublished?: boolean;
};

type TProductVariant = {
  size: string;
  stock: number;
};
