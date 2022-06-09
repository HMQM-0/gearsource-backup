/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  AttributeInput,
  ProductOrder,
} from "./../../../../gqlTypes/globalTypes";
import {
  CategoryProducts_products_edges_node_category,
  CategoryProducts_products_edges_node_pricing,
  CategoryProducts_products_edges_node_thumbnail,
  CategoryProducts_products_edges_node_thumbnail2x,
  CategoryProducts_products_pageInfo,
} from "./CategoryProducts";

// ====================================================
// GraphQL query operation: CategoryBuilderProducts
// ====================================================

export interface CategoryBuilderProducts_products_edges_node {
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
  thumbnail: CategoryProducts_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: CategoryProducts_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CategoryProducts_products_edges_node_pricing | null;
  category: CategoryProducts_products_edges_node_category | null;
}

export interface CategoryBuilderProducts_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  product: CategoryBuilderProducts_products_edges_node;
}

export interface CategoryBuilderProducts_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  products: CategoryBuilderProducts_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CategoryProducts_products_pageInfo;
}

export interface CategoryBuilderProducts {
  /**
   * List of the shop's products.
   */
  productList: CategoryBuilderProducts_products | null;
}

export interface CategoryBuilderProductsVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
