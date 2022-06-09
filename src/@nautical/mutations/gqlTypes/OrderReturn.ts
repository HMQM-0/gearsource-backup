// OrderReturn and related interfaces
interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_thumbnail {
  __typename: "Image";
  url: string;
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_unitPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_unitPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_unitPrice {
  __typename: "TaxedMoney";
  gross: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_unitPrice_gross;
  net: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_unitPrice_net;
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_warehouse {
  __typename: "Warehouse";
  id: string;
  name: string;
}

enum FulfillmentStatus {
  CANCELLED = "CANCELLED",
  FULFILLED = "FULFILLED",
  RETURN_REQUESTED = "RETURN_REQUESTED",
  RETURN_AUTHORIZED = "RETURN_AUTHORIZED",
  RETURN_DECLINED = "RETURN_DECLINED",
  RETURN_RECEIVED = "RETURN_RECEIVED",
  RETURN_COMPLETE = "RETURN_COMPLETE",
  RETURN_CANCELLED = "RETURN_CANCELLED",
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_variant_product {
  __typename: "Product";
  id: string;
  isAvailableForPurchase: boolean | null;
  isPublished: boolean;
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_variant {
  __typename: "ProductVariant";
  id: string;
  product: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_variant_product;
  quantityAvailable: number;
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine {
  __typename: "OrderLine";
  id: string;
  isShippingRequired: boolean;
  variant: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_variant | null;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  unitPrice: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_unitPrice | null;
  thumbnail: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine_thumbnail | null;
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines {
  __typename: "FulfillmentLine";
  id: string;
  quantity: number;
  orderLine: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines_orderLine | null;
}

interface OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments {
  __typename: "Fulfillment";
  id: string;
  lines:
    | (OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_lines | null)[]
    | null;
  fulfillmentOrder: number;
  status: FulfillmentStatus;
  trackingNumber: string;
  warehouse: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments_warehouse | null;
}

export interface OrderReturn {
  errors: {
    code: string;
    field: string;
    message: string;
  };
  fulfillments: OrderFulfillmentCancel_orderFulfillmentCancel_order_fulfillments[];
}

// OrderReturnVariables and related interfaces
export interface OrderReturnPayload {
  fulfillmentId: string;
  lineId: string;
  orderLineId: string;
  quantity: number;
  returnRequestedQty: number;
  decision: string;
  returnReason?: string;
}

export interface OrderReturnVariables {
  input: OrderReturnPayload[];
}
