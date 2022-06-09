import React from "react";

import { useUserWishlist } from "@nautical/react";

import { WishlistContext } from "./context";
import { IProps } from "./types";

const WISHLIST_ITEMS_PER_API_CALL = 100;

export function WishlistProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const { data, loading, error, loadMore, refetch } = useUserWishlist({
    first: WISHLIST_ITEMS_PER_API_CALL,
  });

  React.useEffect(() => {
    if (data && data.pageInfo.hasNextPage) {
      loadMore({
        after: data!.pageInfo.endCursor,
        first: WISHLIST_ITEMS_PER_API_CALL,
      });
    }
  }, [data]);

  const update = () => {
    refetch({
      first: WISHLIST_ITEMS_PER_API_CALL,
    });
  };

  const getContext = () => ({
    error,
    loading,
    update,
    wishlist: data && data.edges.map(({ node }) => node),
  });

  return (
    <WishlistContext.Provider value={getContext()}>
      {children}
    </WishlistContext.Provider>
  );
}
