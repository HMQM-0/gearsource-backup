import React from "react";
import { Box } from "@mui/material";
import * as S from "./styles";
import { IProps } from "./types";

export const Loader: React.FC<IProps> = ({ fullScreen }: IProps) => {
  return (
    <S.Wrapper fullScreen={!!fullScreen}>
      <S.Items>
        <Box component="span" />
        <Box component="span" />
        <Box component="span" />
      </S.Items>
    </S.Wrapper>
  );
};
