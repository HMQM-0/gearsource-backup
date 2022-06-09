import { IMoney } from "@types";
import { ProductDetails_product_thumbnail } from "./ProductDetails";

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Wishlist
// ====================================================

export interface Wishlist_me_wishlist_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface Wishlist_me_wishlist_pricing_priceRangeUndiscounted_start {
  gross: IMoney;
  net: IMoney;
}

export interface Wishlist_me_wishlist_pricing_priceRangeUndiscounted_stop {
  gross: IMoney;
  net: IMoney;
}

export interface Wishlist_me_wishlist_pricing_priceRangeUndiscounted {
  start: Wishlist_me_wishlist_pricing_priceRangeUndiscounted_start;
  stop: Wishlist_me_wishlist_pricing_priceRangeUndiscounted_stop;
}

export interface Wishlist_me_wishlist_pricing {
  priceRangeUndiscounted: Wishlist_me_wishlist_pricing_priceRangeUndiscounted;
}

export interface Wishlist_me_wishlist_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  isAvailableForPurchase: boolean;
  pricing: Wishlist_me_wishlist_pricing;
  thumbnail: ProductDetails_product_thumbnail | null;
}

export interface Wishlist_me_wishlist_edges_node {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: Wishlist_me_wishlist_edges_node_product;
}

export interface Wishlist_me_wishlist_edges {
  __typename: "WishlistItemCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Wishlist_me_wishlist_edges_node;
}

export interface Wishlist_me_wishlist {
  __typename: "WishlistItemCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: Wishlist_me_wishlist_pageInfo;
  edges: Wishlist_me_wishlist_edges[];
}

export interface Wishlist_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User's wishlist.
   */
  wishlist: Wishlist_me_wishlist | null;
}

export interface Wishlist {
  /**
   * Return the currently authenticated user.
   */
  me: Wishlist_me | null;
}

export interface WishlistVariables {
  after?: string | null;
  first?: number | null;
}
