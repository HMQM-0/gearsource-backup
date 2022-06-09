interface OrderLine {
  id: string;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  variantName: string;
}

interface FulfillmentLine {
  id: string;
  quantity: number;
  orderLine: OrderLine;
}

export interface SellerFulfillment {
  id: string;
  relatedTo: string | null;
  status: string;
  lines: FulfillmentLine[];
}
