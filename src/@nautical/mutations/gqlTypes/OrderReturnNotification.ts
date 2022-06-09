// OrderReturnNotification and related interfaces
export interface OrderAddNote_orderAddNote_order_events_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface OrderReturnNotification_orderReturnNotification_order_events {
  __typename: "OrderEvent";
  id: string;
  amount: number | null;
  date: any | null;
  email: string | null;
  emailType: OrderEventsEmailsEnum | null;
  message: string | null;
  quantity: number | null;
  type: OrderEventsEnum | null;
  user: OrderAddNote_orderAddNote_order_events_user | null;
}

export interface OrderReturnNotification_orderReturnNotification_order {
  __typename: "Order";
  id: string;
  events:
    | (OrderReturnNotification_orderReturnNotification_order_events | null)[]
    | null;
}

export interface OrderReturnNotification_orderReturnNotification_errors {
  __typename: "OrderReturnNotificationError";
  code: ReturnErrorCode;
  field: string | null;
}

export interface OrderReturnNotification_orderReturnNotification {
  __typename: "OrderReturnNotification";
  errors: OrderReturnNotification_orderReturnNotification_errors[];
  nauticalOrder: OrderReturnNotification_orderReturnNotification_order | null;
}

export interface OrderReturnNotification {
  orderReturnNotification: OrderReturnNotification_orderReturnNotification | null;
}

// NauticalOrderReturnNotification and related interfaces
export enum OrderEventsEnum {
  CANCELED = "CANCELED",
  DRAFT_ADDED_PRODUCTS = "DRAFT_ADDED_PRODUCTS",
  DRAFT_CREATED = "DRAFT_CREATED",
  DRAFT_REMOVED_PRODUCTS = "DRAFT_REMOVED_PRODUCTS",
  EMAIL_SENT = "EMAIL_SENT",
  EXTERNAL_SERVICE_NOTIFICATION = "EXTERNAL_SERVICE_NOTIFICATION",
  FULFILLMENT_CANCELED = "FULFILLMENT_CANCELED",
  FULFILLMENT_FULFILLED_ITEMS = "FULFILLMENT_FULFILLED_ITEMS",
  FULFILLMENT_RESTOCKED_ITEMS = "FULFILLMENT_RESTOCKED_ITEMS",
  INVOICE_GENERATED = "INVOICE_GENERATED",
  INVOICE_REQUESTED = "INVOICE_REQUESTED",
  INVOICE_SENT = "INVOICE_SENT",
  INVOICE_UPDATED = "INVOICE_UPDATED",
  NOTE_ADDED = "NOTE_ADDED",
  ORDER_FULLY_PAID = "ORDER_FULLY_PAID",
  ORDER_MARKED_AS_PAID = "ORDER_MARKED_AS_PAID",
  OTHER = "OTHER",
  OVERSOLD_ITEMS = "OVERSOLD_ITEMS",
  PAYMENT_AUTHORIZED = "PAYMENT_AUTHORIZED",
  PAYMENT_CAPTURED = "PAYMENT_CAPTURED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  PAYMENT_REFUNDED = "PAYMENT_REFUNDED",
  PAYMENT_VOIDED = "PAYMENT_VOIDED",
  PLACED = "PLACED",
  PLACED_FROM_DRAFT = "PLACED_FROM_DRAFT",
  RETURN_REQUESTED = "RETURN_REQUESTED",
  RETURN_AUTHORIZED = "RETURN_AUTHORIZED",
  RETURN_DECLINED = "RETURN_DECLINED",
  RETURN_RECEIVED = "RETURN_RECEIVED",
  RETURN_CANCELLED = "RETURN_CANCELLED",
  RETURN_COMPLETE = "RETURN_COMPLETE",
  TRACKING_UPDATED = "TRACKING_UPDATED",
  UPDATED_ADDRESS = "UPDATED_ADDRESS",
}

export enum OrderEventsEmailsEnum {
  DIGITAL_LINKS = "DIGITAL_LINKS",
  FULFILLMENT_CONFIRMATION = "FULFILLMENT_CONFIRMATION",
  ORDER_CANCEL = "ORDER_CANCEL",
  ORDER_CONFIRMATION = "ORDER_CONFIRMATION",
  ORDER_REFUND = "ORDER_REFUND",
  PAYMENT_CONFIRMATION = "PAYMENT_CONFIRMATION",
  SHIPPING_CONFIRMATION = "SHIPPING_CONFIRMATION",
  TRACKING_UPDATED = "TRACKING_UPDATED",
}

export interface NauticalOrderAddNote_orderAddNote_order_events_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface NauticalOrderReturnNotification_orderReturnNotification_order_events {
  __typename: "NauticalOrderEvent";
  id: string;
  amount: number | null;
  date: any | null;
  email: string | null;
  emailType: OrderEventsEmailsEnum | null;
  message: string | null;
  quantity: number | null;
  type: OrderEventsEnum | null;
  user: NauticalOrderAddNote_orderAddNote_order_events_user | null;
}

export interface NauticalOrderReturnNotification_orderReturnNotification_order {
  __typename: "NauticalOrder";
  id: string;
  events:
    | (NauticalOrderReturnNotification_orderReturnNotification_order_events | null)[]
    | null;
}

export enum ReturnErrorCode {
  RETURN_ERROR = "RETURN_ERROR",
}

export interface NauticalOrderReturnNotification_orderReturnNotification_errors {
  __typename: "NauticalOrderReturnNotificationError";
  code: ReturnErrorCode;
  field: string | null;
}

export interface NauticalOrderReturnNotification_orderReturnNotification {
  __typename: "NauticalOrderReturnNotification";
  errors: NauticalOrderReturnNotification_orderReturnNotification_errors[];
  nauticalOrder: NauticalOrderReturnNotification_orderReturnNotification_order | null;
}

export interface NauticalOrderReturnNotification {
  nauticalOrderReturnFromStorefrontNotification: NauticalOrderReturnNotification_orderReturnNotification;
}

// OrderReturnNotificationVariables and related interfaces
export interface OrderReturnNotificationInput {
  returnStatus: string;
  productNames?: string;
}

export interface OrderReturnNotificationVariables {
  order: string;
  input: OrderReturnNotificationInput;
}
