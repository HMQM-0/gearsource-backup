/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  AttributeInput,
  ProductOrder,
} from "./../../../../gqlTypes/globalTypes";
import {
  SearchProducts_products_edges_node_category,
  SearchProducts_products_edges_node_pricing,
  SearchProducts_products_edges_node_thumbnail,
  SearchProducts_products_edges_node_thumbnail2x,
} from "./SearchProducts";

// ====================================================
// GraphQL query operation: BuilderSearchProducts
// ====================================================

export interface BuilderSearchProducts_products_edges_node {
  __typename: "Product";
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SearchProducts_products_edges_node_pricing | null;
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
  thumbnail: SearchProducts_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: SearchProducts_products_edges_node_thumbnail2x | null;
  category: SearchProducts_products_edges_node_category | null;
}

export interface BuilderSearchProducts_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  product: BuilderSearchProducts_products_edges_node;
}

export interface BuilderSearchProducts_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  startCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BuilderSearchProducts_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  products: BuilderSearchProducts_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: BuilderSearchProducts_products_pageInfo;
}

export interface BuilderSearchProducts_attributes_edges_node_values {
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

export interface BuilderSearchProducts_attributes_edges_node {
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
  values: (BuilderSearchProducts_attributes_edges_node_values | null)[] | null;
}

export interface BuilderSearchProducts_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  attribute: BuilderSearchProducts_attributes_edges_node;
}

export interface BuilderSearchProducts_attributes {
  __typename: "AttributeCountableConnection";
  attributes: BuilderSearchProducts_attributes_edges[];
}

export interface BuilderSearchProducts {
  /**
   * List of the shop's products.
   */
  productList: BuilderSearchProducts_products | null;
  /**
   * List of the shop's attributes.
   */
  attributeList: BuilderSearchProducts_attributes | null;
}

export interface BuilderSearchProductsVariables {
  query: string;
  attributes?: (AttributeInput | null)[] | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  after?: string | null;
}
