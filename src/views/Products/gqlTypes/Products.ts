/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  AttributeInput,
  ProductOrder,
} from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Products_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface Products_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Products_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Products_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Products_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Products_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: Products_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface Products_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Products_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Products_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Products_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: Products_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface Products_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Products_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Products_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface Products_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Products_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Products_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Products_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: Products_products_edges_node_pricing_priceRange_start_net;
}

export interface Products_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Products_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Products_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Products_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: Products_products_edges_node_pricing_priceRange_stop_net;
}

export interface Products_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Products_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Products_products_edges_node_pricing_priceRange_stop | null;
}

export interface Products_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: Products_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: Products_products_edges_node_pricing_priceRange | null;
}

export interface Products_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Products_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  isAvailable: boolean;
  isAvailableForPurchase: boolean;
  availableForPurchase: any;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: Products_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: Products_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Products_products_edges_node_pricing | null;
  category: Products_products_edges_node_category | null;
  attributes: (Products_products_edges_node_attributes | null)[];
}

export interface Products_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * The ID of the object.
   */
  attribute: Products_products_edges_node_attributes_attribute;
  values: (Products_products_edges_node_attributes_values | null)[];
}

export interface Products_products_edges_node_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
}

export interface Products_products_edges_node_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface Products_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Products_products_edges_node;
}

export interface Products_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface Products_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: Products_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: Products_products_pageInfo;
}

export interface Products_Products_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Products_Products_ancestors_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Products_Products_ancestors_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Products_Products_ancestors_edges_node;
}

export interface Products_Products_ancestors {
  __typename: "CategoryCountableConnection";
  edges: Products_Products_ancestors_edges[];
}

export interface Products_category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: Products_Products_backgroundImage | null;
  /**
   * List of ancestors of the category.
   */
  ancestors: Products_Products_ancestors | null;
}

export interface Products_attributes_edges_node_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface Products_attributes_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of attribute's values.
   */
  values: (Products_attributes_edges_node_values | null)[] | null;
}

export interface Products_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Products_attributes_edges_node;
}

export interface Products_attributes {
  __typename: "AttributeCountableConnection";
  edges: Products_attributes_edges[];
}

export interface PageItem {
  __typename: "Page";
  id: string;
  name: string;
}

export interface CategoryItem {
  __typename: "Category";
  id: string;
  name: string;
}

export interface CollectionItem {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface MenuItem {
  __typename: "MenuItem";
  id: string;
  level: number;
  name: string;
  children: MenuItem[] | null;
  parent: MenuItem | null;
  category: CategoryItem | null;
  collection: CollectionItem | null;
  page: PageItem | null;
}

export interface Menu {
  __typename: "Menu";
  id: string;
  name: string;
  items: MenuItem[] | null;
}

export interface Products {
  /**
   * List of the shop's products.
   */
  products: Products_products | null;
  /**
   * List of the shop's attributes.
   */
  attributes: Products_attributes | null;
  // Side Nav Menu
  menu: Menu | null;
}

export interface ProductsVariables {
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
