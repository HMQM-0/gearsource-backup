import { Variant } from "../../commonTypes";
import { SellerFulfillment } from "./SellerFulfillment";

interface Discount {
  currency: string;
  amount: number;
}

interface Amount {
  amount: number;
  currency: string;
}

interface Price {
  currency?: string;
  gross: Amount;
  net: Amount;
}

interface Line {
  productName: string;
  productSku: string;
  quantity: number;
  totalPrice: Price;
  unitPrice: Price;
  variant: Variant;
}

interface Country {
  code: string;
  country: string;
}

interface Address {
  city: string;
  companyName: string;
  country: Country;
  countryArea: string;
  firstName: string;
  id: string;
  isDefaultBillingAddress: boolean | null;
  isDefaultShippingAddress: boolean | null;
  lastName: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface Order {
  discount: Discount;
  discountName: string | null;
  id: string;
  invoices: any[];
  lines: Line[];
  number: string;
  paymentStatus: string;
  paymentStatusDisplay: string;
  sellerFulfillments: SellerFulfillment[];
  shippingAddress: Address;
  shippingPrice: Price;
  status: string;
  statusDisplay: string;
  subtotal: Amount;
  token: string;
  total: Price;
  userEmail: string;
  volumeDiscount: Price;
}
