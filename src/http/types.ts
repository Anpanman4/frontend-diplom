export type UserBody = { email: string; password: string; firstName: string };

export type ProductType = {
  _id: string;
  title: string;
  about: string;
  price: string;
  image: string;
  isVisible: boolean;
};

export type ProductCountType = ProductType & {
  count: number;
};
