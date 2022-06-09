import React from "react";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { AddToWishlist } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  return (
    <S.Wrapper>
      <S.TextBlock>
        <S.Title data-test="productTile">{product.name}</S.Title>
        <S.Price data-test="productPrice">
          <TaxedMoney taxedMoney={price} />
        </S.Price>
      </S.TextBlock>
      <S.Image data-test="productThumbnail">
        <Thumbnail source={product} />
      </S.Image>
      <S.Spacer></S.Spacer>
      <S.AddToWishlist show={true}>
        <AddToWishlist productId={product.id} showButtonText={true} />
      </S.AddToWishlist>
    </S.Wrapper>
  );
};

export const ProductTileStyle1: React.FC<IProps> = ({ product }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  return (
    <S.Wrapper>
      <S.TextBlock>
        <S.Title data-test="productTile">{product.name}</S.Title>
        <S.Price data-test="productPrice">
          <TaxedMoney taxedMoney={price} />
        </S.Price>
      </S.TextBlock>
      <S.Image data-test="productThumbnail">
        <Thumbnail source={product} />
      </S.Image>
      <S.Spacer></S.Spacer>
      <S.AddToWishlist show={true}>
        <AddToWishlist productId={product.id} showButtonText={true} />
      </S.AddToWishlist>
    </S.Wrapper>
  );
};
