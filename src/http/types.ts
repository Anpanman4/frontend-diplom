type NumericId = number;

export type ProductType = {
  _id: NumericId;
  title: string;
  about: string;
  price: string;
  image: string;
  isVisible: boolean;
};

export type ProductCountType = ProductType & {
  count: number;
};
