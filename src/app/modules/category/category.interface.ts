export type TCategory = {
  name: string;
  subCategories?: TSubCategory[];
  image: string;
  isDeleted: boolean;
};

export type TSubCategory = {
  name: string;
  isPublished?: boolean;
  isDeleted?: boolean;
};
