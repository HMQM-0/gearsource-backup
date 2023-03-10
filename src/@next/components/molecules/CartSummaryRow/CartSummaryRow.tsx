import React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";
import { TaxedMoney } from "@components/containers";
import { commonMessages } from "@temp/intl";
import { CachedImage } from "../CachedImage";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Row with product to display in cart summary.
 */
const CartSummaryRow: React.FC<IProps> = ({
  index,
  sku,
  name,
  price,
  quantity,
  thumbnail,
}: IProps) => {
  return (
    <S.Wrapper data-test="cartSummary" data-test-id={sku}>
      <S.Name data-test="name">{name}</S.Name>
      <S.Sku>
        <FormattedMessage {...commonMessages.sku} />
        {": "}
        <Box component="span" data-test="sku">
          {sku}
        </Box>
      </S.Sku>
      <S.Quantity>
        <FormattedMessage {...commonMessages.quantity} />
        {": "}
        <Box component="span" data-test="quantity">
          {quantity}
        </Box>
      </S.Quantity>
      <S.Price data-test="price">
        <TaxedMoney taxedMoney={price} />
      </S.Price>
      <S.Photo>
        <CachedImage data-test="image" {...thumbnail} />
      </S.Photo>
    </S.Wrapper>
  );
};

export { CartSummaryRow };
