/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CountryCode } from "./../../../../gqlTypes/globalTypes";
import { Seller } from "@temp/@next/components/organisms/CheckoutShipping/gqlTypes/MultiSellerCheckout";
import {
  ProductDetails_product_attributes,
  ProductDetails_product_category_products_edges_node,
  ProductDetails_product_images,
  ProductDetails_product_pricing,
  ProductDetails_product_thumbnail,
  ProductDetails_product_thumbnail2x,
  ProductDetails_product_variants,
} from "@temp/@nautical/queries/gqlTypes/ProductDetails";
import { ProductFeatures } from "./ProductDetails";

// ====================================================
// GraphQL query operation: BuilderProductDetails
// ====================================================

export interface BuilderProductDetails_product_category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  product: ProductDetails_product_category_products_edges_node;
}

export interface BuilderProductDetails_product_category_products {
  __typename: "ProductCountableConnection";
  products: BuilderProductDetails_product_category_products_edges[];
}

export interface BuilderProductDetails_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of products in the category.
   */
  productList: BuilderProductDetails_product_category_products | null;
}

export interface BuilderProductDetails_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductDetails_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductDetails_product_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetails_product_pricing | null;
  descriptionJson: any;
  category: BuilderProductDetails_product_category | null;
  /**
   * List of images for the product.
   */
  images: (ProductDetails_product_images | null)[] | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductDetails_product_attributes[];
  /**
   * List of variants for the product.
   */
  variants: (ProductDetails_product_variants | null)[] | null;
  defaultVariant: ProductDetails_product_variants;
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  /**
   * Seller on product
   */
  seller: Seller | null;
  /**
   * List of features for the product
   */
  features: ProductFeatures[] | null;
}

export interface BuilderProductDetails {
  /**
   * Look up a product by ID.
   */
  product: BuilderProductDetails_product | null;
}

export interface BuilderProductDetailsVariables {
  id?: string;
  slug?: string;
  countryCode?: CountryCode | null;
}
