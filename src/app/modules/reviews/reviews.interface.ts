export type TReview = {
  productId: string;
  userId?: string;
  rating: number;
  comment: string;
  isShown?: boolean;
  isDeleted?: boolean;
};
