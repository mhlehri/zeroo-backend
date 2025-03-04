export type TCategory = {
  name: string;
  subCategories?: TSubCategory[];
  image: string;
  isPublished: boolean;
};

export type TSubCategory = {
  name: string;
  isPublished: boolean;
};
