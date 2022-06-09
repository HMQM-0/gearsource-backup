/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  AttributeInput,
  ProductOrder,
} from "./../../../../gqlTypes/globalTypes";
import {
  CollectionProducts_collection_products_edges_node,
  CollectionProducts_collection_products_pageInfo,
} from "./CollectionProducts";

// ====================================================
// GraphQL query operation: CollectionProducts
// ====================================================

export interface BuilderCollectionProducts_collection_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  product: CollectionProducts_collection_products_edges_node;
}

export interface BuilderCollectionProducts_collection_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  products: BuilderCollectionProducts_collection_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionProducts_collection_products_pageInfo;
}

export interface BuilderCollectionProducts_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of products in this collection.
   */
  productList: BuilderCollectionProducts_collection_products | null;
}

export interface BuilderCollectionProducts {
  /**
   * Look up a collection by ID.
   */
  collection: BuilderCollectionProducts_collection | null;
}

export interface BuilderCollectionProductsVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
