import { Variant, Price } from "../../commonTypes";

export interface Line {
  productName: string;
  productSku: string;
  quantity: number;
  totalPrice: Price;
  unitPrice: Price;
  variant: Variant;
}
