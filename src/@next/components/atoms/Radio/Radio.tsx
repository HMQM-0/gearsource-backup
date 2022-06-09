import React from "react";
import { Box } from "@mui/material";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Radio input.
 */
const Radio: React.FC<IProps> = ({
  checked,
  children,
  customLabel = false,
  ...props
}: IProps) => {
  return customLabel ? (
    <S.Input checked={checked || false}>
      <input type="radio" checked={checked} {...props} />{" "}
      <div>
        <Box component="span" />
      </div>
      {children}
    </S.Input>
  ) : (
    <S.LabeledInput checked={checked || false}>
      <input type="radio" checked={checked} {...props} />{" "}
      <div>
        <Box component="span" />
      </div>
      {children}
    </S.LabeledInput>
  );
};

export { Radio };
