import { IShippingMethod } from "./types";

const shippingMethods: IShippingMethod[] = [
  {
    id: "1",
    name: "Basic",
    price: {
      amount: 32,
      currency: "USD",
    },
  },
  {
    id: "2",
    name: "Extra",
    price: {
      amount: 64,
      currency: "USD",
    },
  },
];

const sellerShippingMethods = [
  {
    seller: "Foo",
    id: "1",
  },
  {
    seller: "Foo",
    id: "2",
  },
];

export const DEFAULT_PROPS = {
  shippingMethods,
  sellerShippingMethods,
  selectedShippingMethodIds: "1",
  sellerLineMapping: {},
};
