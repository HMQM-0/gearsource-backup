/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Wishlist_me_wishlist_pricing } from "@nautical/queries/gqlTypes/Wishlist";
import { ProductDetails_product_thumbnail } from "@nautical/queries/gqlTypes/ProductDetails";

// ====================================================
// GraphQL fragment: WishlistItem
// ====================================================

export interface WishlistItem_product {
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

export interface WishlistItem {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: WishlistItem_product;
}
