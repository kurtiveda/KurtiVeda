export type ProductType = {
  _id: string;
  Title: string;
  description: string;
  Price: number;
  productMedia: [{ asset: { url: string } }];
  out_of_stock: boolean;
  sizes: string[];
  line_description: string;
  features: string;
};

export type BannerType = {
  _id: string;
  Title: string;
  description: string;
  bannerMedia: [{ asset: { url: string } }];
};

export type Filters = {
  sort: string;
  sizes: string[];
  price?: { min: number; max: number };
  categories: string[];
};

export type Categories = {
  title: string;
  _id: string;
};

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  Quantity: number;
  size: string;
};

export type Addresses =
  | {
      id: string;
      name: string;
      phone: string;
      zip: number;
      state: string;
      city: string;
      street: string;
    }[]
  | undefined;

export type OrdersType = {
  status: string;
  payment_date: Date;
  Tr_id: string;
  Tr_amt: number;
  del_status: string;
  products: [
    {
      id: string;
      name: string;
      price: number;
      Quantity: number;
      size: string;
    }
  ];
  delivery: {
    name: string;
    phone: string;
    zip: number;
    state: string;
    city: string;
    street: string;
  };
};
