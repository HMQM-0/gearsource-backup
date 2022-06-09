import React from "react";
import { ProductSideNavbarList } from "../ProductSideNavbar/ProductSideNavbarList";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductSideNavbarGrid: React.FC<IProps> = ({
  children,
  menu,
  matches,
}: IProps) => {
  return (
    <>
      {matches ? (
        <S.Wrapper>
          <S.Grid>
            <S.Nav>
              <ProductSideNavbarList items={menu?.items} />
            </S.Nav>
            {children}
          </S.Grid>
        </S.Wrapper>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
