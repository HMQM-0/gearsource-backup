import React from "react";
import { Thumbnail } from "..";
import * as S from "./styles";
import { Line } from "./types/Line";

export const ReturnLineItem: React.FC<{ line: Line }> = ({ line }) => {
  return (
    <S.Row key={line.orderLine.variant.id}>
      <S.ProductImage>
        <Thumbnail source={line.variant.product} />
      </S.ProductImage>
      <S.ProductName>{line.orderLine.productName}</S.ProductName>
      <S.QuantityReturned>{line.quantity}</S.QuantityReturned>
      <S.ItemPrice>{`${
        line.orderLine.unitPrice.gross.currency === "USD"
          ? "$"
          : line.orderLine.unitPrice.currency + " "
      }${line.orderLine.unitPrice.gross.amount.toFixed(2)}`}</S.ItemPrice>
      <S.ReturnReason>{line.returnReason}</S.ReturnReason>
    </S.Row>
  );
};
