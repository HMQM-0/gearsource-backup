import React from "react";
import { FormattedMessage } from "react-intl";
import { useVisibility } from "@temp/_nautical/hooks";
import { Link } from "react-router-dom";

import { Loader } from "@components/atoms";
import ProductListItem from "@temp/components/ProductListItem";

import {
  generateProductUrl,
  // generateMicrositeProductUrl,
  // isMicrosite,
  // getMicrositeId,
  // getMicrositeSlug,
} from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { useAuth } from "@nautical/react";
import { Button } from "@mui/material";

export const ProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
}: IProps) => {
  const moreButton = useVisibility(
    (visible) => {
      if (!loading) {
        if (visible && canLoadMore) {
          setTimeout(() => {
            onLoadMore();
          }, 500);
        }
      }
    },
    [loading, canLoadMore, products]
  );

  const { loginForPrice } = React.useContext(ShopContext);
  const { user } = useAuth();

  return (
    <>
      <S.List data-test="productList" data-test-id={testingContextId}>
        {products.map((product) => {
          const { id, name } = product;
          return (
            id &&
            name && (
              <Link
                to={
                  generateProductUrl(product)
                }
                key={id}
              >
                <ProductListItem
                  wide
                  product={product}
                  loginForPrice={loginForPrice && !user}
                />
              </Link>
            )
          );
        })}
      </S.List>
      <S.Loader>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <div ref={moreButton}>
              <Button
                variant="contained"
                // testingContext="loadMoreProductsButton"
                color="secondary"
                onClick={onLoadMore}
              >
                <FormattedMessage defaultMessage="More +" />
              </Button>
            </div>
          )
        )}
      </S.Loader>
    </>
  );
};

/*
<ProductTile product={product} />
*/
