// @ts-nocheck
import React from "react";
import { Box } from "@mui/material";
import { Radio } from "@mui/material";
// import { Radio } from "@components/atoms";
import { Money } from "@components/containers";

import * as S from "./styles";

import { CachedImage } from "../../molecules";

import { IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShippingLines: React.FC<IProps> = ({
  selectedShippingMethodIds,
  shippingMethods,
  lines,
  seller,
  sellerName,
  onFieldChange,
  values,
}: IProps) => {
  const totalItems = lines?.reduce((number, line) => number + line.quantity, 0);

  return (
    <section>
      <S.MultiSeller>
        <S.FulfilledBy>
          {totalItems} item(s) fulfilled by {sellerName}
        </S.FulfilledBy>
        {lines?.map((line, index) => {
          return (
            <S.MultiSeller_rows key={index}>
              <S.Photo>
                {
                  <CachedImage
                    data-test={`checkoutShippingSellerProducts${sellerName}`}
                    {...line.variant?.product?.thumbnail}
                  />
                }
              </S.Photo>
              <S.LineText>{line.variant?.product?.name}</S.LineText>
              <S.LineText>{line.variant?.name}</S.LineText>
              <S.LineText>{line.quantity} item(s)</S.LineText>
            </S.MultiSeller_rows>
          );
        })}
        <S.MultiSeller_methods>
          <S.Tile data-test={`shippingMethodTile${seller}`}>
            {shippingMethods?.map(({ id, name, price }, index) => {
              const sellerSelection = JSON.parse(
                selectedShippingMethodIds
              ).filter(function (sellerAndMethod) {
                return sellerAndMethod.seller === seller;
              });
              const checked =
                !!values[seller] && values[seller].length > 0
                  ? !!values[seller] && values[seller] === id
                  : sellerSelection &&
                    sellerSelection.length > 0 &&
                    sellerSelection[0]?.shippingMethod?.id === id;
              return (
                <Radio
                  name={seller}
                  value={id}
                  checked={checked}
                  onChange={() => onFieldChange(seller, id)}
                >
                  <Box
                    component="span"
                    data-test={`checkoutShippingMethodOption${index}Name`}
                  >
                    {name + " |"}
                    &nbsp;
                  </Box>
                  <S.Price>
                    <Money
                      data-test={`checkoutShippingMethodOption${index}Price`}
                      money={price}
                    />
                  </S.Price>
                </Radio>
              );
            })}
          </S.Tile>
        </S.MultiSeller_methods>
      </S.MultiSeller>
    </section>
  );
};

export { CheckoutShippingLines };
