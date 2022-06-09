import React from "react";

import * as S from "./styles";
import { WishlistTable } from "@components/molecules/WishlistTable/WishlistTable";
import { WishlistContext } from "@temp/@nautical/react/components/WishlistProvider/context";
import { IProps } from "./types";

export const Wishlist: React.FC<IProps> = () => {
  const { wishlist } = React.useContext(WishlistContext);

  return (
    <S.Wrapper>
      <>
        <WishlistTable wishlist={wishlist} />
        {/* data?.pageInfo?.hasNextPage && (
            <S.Wrapper>
                <Button
                    testingContext="loadMoreWishlistButton"
                    onClick={() => {
                        loadMore({
                            after: data.pageInfo.endCursor,
                            perPage: 5,
                        });
                    }}
                >
                    <FormattedMessage defaultMessage="Load more" />
                </Button>
            </S.Wrapper>
                ) */}
      </>
    </S.Wrapper>
  );
};
