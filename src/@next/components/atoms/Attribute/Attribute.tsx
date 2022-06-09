import React from "react";
import { Box } from "@mui/material";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * The attribute
 */
export const Attribute: React.FC<IProps> = ({
  description,
  attributeValue,
  testingContext,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Description>{description}</S.Description>
      <Box data-test={testingContext}>{attributeValue}</Box>
    </S.Wrapper>
  );
};
