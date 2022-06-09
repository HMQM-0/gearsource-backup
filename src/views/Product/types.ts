// import { ICheckoutModelLine } from "@nautical/sdk/lib/helpers";
import { ICheckoutModelLine } from "@nautical/helpers";
import { Microsite_microsite } from "../Microsites/gqlTypes/Microsite";
import { BuilderProductDetails_product } from "./gqlTypes/BuilderProductDetails";

import { ProductDetails_product } from "./gqlTypes/ProductDetails";

export interface IProps {
  microsite: Microsite_microsite | null;
  product: ProductDetails_product | BuilderProductDetails_product;
  add: (variantId: string, quantity: number) => any;
  items: ICheckoutModelLine[];
}
