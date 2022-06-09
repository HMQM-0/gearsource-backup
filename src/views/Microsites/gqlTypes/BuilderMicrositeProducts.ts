/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  AttributeInput,
  ProductOrder,
} from "./../../../../gqlTypes/globalTypes";
import { MicrositeProducts_microsite_products_edges_node } from "./MicrositeProducts";

// ====================================================
// GraphQL query operation: MicrositeProducts
// ====================================================

export interface BuilderMicrositeProducts_microsite_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  product: MicrositeProducts_microsite_products_edges_node;
}

export interface BuilderMicrositeProducts_microsite_products_pageInfo {
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

export interface BuilderMicrositeProducts_microsite_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  products: BuilderMicrositeProducts_microsite_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: BuilderMicrositeProducts_microsite_products_pageInfo;
}

export interface BuilderMicrositeProducts_microsite {
  __typename: "Microsite";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of products in this collection.
   */
  productList: BuilderMicrositeProducts_microsite_products | null;
}

export interface BuilderMicrositeProducts {
  /**
   * Look up a microsite by ID.
   */
  microsite: BuilderMicrositeProducts_microsite | null;
}

export interface BuilderMicrositeProductsVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
