import { Variant } from "../../commonTypes";

export interface Line {
  id: string;
  quantity: number;
  returnReason: string;
  orderLine: any;
  variant: Variant;
}
