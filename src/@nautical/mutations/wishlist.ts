import gql from "graphql-tag";

import { wishlistItemFragment } from "../fragments/wishlist";

export const addWishlistProduct = gql`
  ${wishlistItemFragment}
  mutation AddWishlistProduct($productId: ID!) {
    wishlistAddProduct(productId: $productId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const removeWishlistProduct = gql`
  ${wishlistItemFragment}
  mutation RemoveWishlistProduct($productId: ID!) {
    wishlistRemoveProduct(productId: $productId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const addWishlistProductVariant = gql`
  ${wishlistItemFragment}
  mutation AddWishlistProductVariant($variantId: ID!) {
    wishlistAddVariant(variantId: $variantId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const removeWishlistProductVariant = gql`
  ${wishlistItemFragment}
  mutation RemoveWishlistProductVariant($variantId: ID!) {
    wishlistRemoveVariant(variantId: $variantId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;
