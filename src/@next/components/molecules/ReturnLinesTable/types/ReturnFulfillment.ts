import { Line } from "./Line";

interface Seller {
  companyName: string;
  id: string;
}

interface Order {
  id: string;
  seller: Seller;
}

export interface ReturnFulfillment {
  fulfillmentOrder: number;
  id: string;
  lines: Line[];
  order: Order;
  relatedTo: { id: string };
  status: string;
  trackingNumber: string;
  warehouse: { id: string; name: string };
}
