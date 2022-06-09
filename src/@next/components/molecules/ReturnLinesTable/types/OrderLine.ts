import { Variant, Price } from "../../commonTypes";

export interface OrderLine {
  productName: string;
  productSku: string;
  quantity: number;
  totalPrice: Price;
  unitPrice: Price;
  variant: Variant;
}
