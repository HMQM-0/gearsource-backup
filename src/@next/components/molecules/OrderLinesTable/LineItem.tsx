import React from "react";
import { Thumbnail } from "..";
import * as S from "./styles";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { returnReasons } from "./returnReasons";
import { getMaxQuantityReturnable } from "../utils";
import { Line } from "./types/Line";
import { SellerFulfillment } from "./types/SellerFulfillment";

interface LineItemProps {
  itemInfo: any;
  line: Line;
  sellerFulfillments: SellerFulfillment[];
  setItemInfo: (obj: any) => void;
  setShowErrorMessage: (bool: boolean) => void;
}

export const LineItem: React.FC<LineItemProps> = ({
  line,
  sellerFulfillments,
  itemInfo,
  setShowErrorMessage,
  setItemInfo,
}) => {
  // VARIABLES FROM PROPS
  const lineItemInfo = itemInfo[line.productName];
  const isChecked = lineItemInfo?.isChecked;
  const quantity = lineItemInfo?.quantity;
  const returnReason = lineItemInfo?.returnReason;

  // HELPER FUNCTIONS
  const handleIsCheckedChange = () => {
    setShowErrorMessage(false);
    const newCheckedState = !isChecked;
    setItemInfo({
      ...itemInfo,
      [line.productName]: {
        isChecked: newCheckedState,
        quantity,
        returnReason,
      },
    });
  };

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setShowErrorMessage(false);
    setItemInfo({
      ...itemInfo,
      [line.productName]: {
        isChecked,
        quantity: event.target.value as string,
        returnReason,
      },
    });
  };

  const handleReturnReasonChange = (event: SelectChangeEvent) => {
    setShowErrorMessage(false);
    setItemInfo({
      ...itemInfo,
      [line.productName]: {
        isChecked,
        quantity,
        returnReason: event.target.value as string,
      },
    });
  };

  // VARIABLES
  const label = { inputProps: { "aria-label": "checkbox" } };
  const maxQuantityReturnable = getMaxQuantityReturnable(
    line,
    sellerFulfillments
  );
  const returnableQuantityRange = Array.from(
    { length: maxQuantityReturnable },
    (_, i) => i + 1
  );

  return (
    <S.Row key={line.variant.id}>
      <S.CheckBox>
        <Checkbox
          {...label}
          checked={isChecked ? isChecked : false}
          onClick={handleIsCheckedChange}
          disabled={maxQuantityReturnable === 0}
        />
      </S.CheckBox>
      <S.ProductImage>
        <Thumbnail source={line.variant.product} />
      </S.ProductImage>
      <S.ProductName>{line.productName}</S.ProductName>
      <S.QuantityPurchased>{line.quantity}</S.QuantityPurchased>
      <S.ItemPrice>{`${
        line.unitPrice.currency === "USD" ? "$" : line.unitPrice.currency + " "
      }${line.unitPrice.gross.amount.toFixed(2)}`}</S.ItemPrice>
      {maxQuantityReturnable ? (
        <>
          <S.ReturnQuantity>
            <Box sx={{ minWidth: 30 }}>
              <FormControl fullWidth disabled={!isChecked}>
                <InputLabel id="quantity-select-label">Qty</InputLabel>
                <Select
                  labelId="quantity-select-label"
                  id="quantity-select"
                  value={quantity ? quantity.toString() : ""}
                  label="Qty"
                  onChange={handleQuantityChange}
                >
                  {returnableQuantityRange.map((qty) => (
                    <MenuItem key={qty} value={qty}>
                      {qty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </S.ReturnQuantity>
          <S.ReturnReason>
            <Box sx={{ width: 190, minWidth: 190, maxWidth: 190 }}>
              <FormControl fullWidth disabled={!isChecked}>
                <InputLabel id="reason-select-label">Reason</InputLabel>
                <Select
                  labelId="reason-select-label"
                  id="reason-select"
                  value={returnReason || ""}
                  label="Reason"
                  onChange={handleReturnReasonChange}
                >
                  {returnReasons.map((reason) => (
                    <MenuItem key={reason} value={reason}>
                      {reason}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </S.ReturnReason>
        </>
      ) : (
        <S.ReturnMessage>No items to return.</S.ReturnMessage>
      )}
    </S.Row>
  );
};
