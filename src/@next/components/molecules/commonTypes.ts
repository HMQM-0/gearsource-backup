import {
  ProductDetails_product_thumbnail,
  ProductDetails_product_thumbnail2x,
} from "@temp/@nautical/queries/gqlTypes/ProductDetails";

interface Amount {
  amount: number;
  currency: string;
}

export interface Price {
  gross: Amount;
  net: Amount;
  currency?: string;
}

interface Attribute {
  id: string;
  name: string;
}

interface Value {
  id: string;
  name: string;
  value: string;
}

interface Attributes {
  attribute: Attribute;
  values: Value[];
}

interface Pricing {
  onSale: boolean;
  price: Price;
  priceUndiscounted: Price;
}

interface ProductType {
  id: string;
  isShippingRequired: boolean;
}
interface Product {
  id: string;
  name: string;
  productType: ProductType;
  thumbnail: ProductDetails_product_thumbnail;
  thumbnail2x: ProductDetails_product_thumbnail2x;
}

export interface Variant {
  attributes: Attributes[];
  id: string;
  isAvailable: boolean;
  name: string;
  pricing: Pricing;
  product: Product;
  quantityAvailable: number;
  sku: string;
}
