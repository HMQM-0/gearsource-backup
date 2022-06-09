import * as React from "react";

import { WishlistItem } from "@nautical/fragments/gqlTypes/WishlistItem";

import { ApolloErrorWithUserInput } from "../../types";

export interface IWishlistContext {
  wishlist: WishlistItem[] | null;
  loading: boolean;
  error: ApolloErrorWithUserInput | null;
  update(): void;
}

export const WishlistContext = React.createContext<IWishlistContext>({
  error: null,
  loading: false,
  update: () => null,
  wishlist: [],
});

WishlistContext.displayName = "WishlistContext";
