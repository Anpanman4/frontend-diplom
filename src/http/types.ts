export type UserBody = { email: string; password: string; firstName: string };

export type ProductType = {
  _id: string;
  title: string;
  about: string;
  price: string;
  smell: string[];
  hairType: string[];
  fixationDegree: number;
  volume: number;
  image: string;
  isVisible: boolean;
};

export type ProductUpdatingType = {
  title: string;
  about: string;
  price: string;
  smell: string[];
  hairType: string[];
  fixationDegree: number;
  volume: number;
  image: File;
};

export type ProductCountType = ProductType & {
  count: number;
};

export type UserType = {
  _id: string;
  email: string;
  firstName: string;
  roles: string[];
  createdAt: string;
};
