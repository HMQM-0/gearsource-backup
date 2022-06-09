import React from "react";
import { Box } from "@mui/material";
import { IProps } from "./types";

export const Money: React.FC<IProps> = ({
  money,
  defaultValue,
  ...props
}: IProps) => {
  if (!money) {
    return (
      <Box component="span" {...props}>
        {defaultValue}
      </Box>
    );
  }
  return (
    <Box component="span" {...props}>
      {money.currency && money.currency !== ""
        ? money.amount.toLocaleString(undefined, {
            currency: money.currency,
            style: "currency",
          })
        : money.amount.toString()}
    </Box>
  );
};

Money.displayName = "Money";
export default Money;
