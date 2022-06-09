import React from "react";

import { NavLink, ShadowBox } from "@components/atoms";
import { useHandlerWhenClickedOutside } from "@hooks";

import * as S from "./styles";

const Column: React.FC<any> = ({ item }) => (
  <S.RowItem>
    {/* @ts-ignore */}
    <S.SubLink item={item} />
    {item.children.length > 0 &&
      // @ts-ignore
      item.children.map((subitem: any) => <S.SubLink item={subitem} light />)}
  </S.RowItem>
);

export const Dropdown: React.FC<any> = ({ onHide, item }) => {
  const { setElementRef } = useHandlerWhenClickedOutside(onHide);

  return (
    <S.Wrapper ref={setElementRef} onMouseLeave={onHide} onClick={onHide}>
      <S.Rows>
        {item.children.map((item: any) => (
          <Column item={item} />
        ))}
      </S.Rows>
      <S.Side>
        <S.RowItem>
          {/* @ts-ignore */}
          <NavLink item={{ ...item, name: "view all products" }} />
        </S.RowItem>
      </S.Side>
      <ShadowBox />
    </S.Wrapper>
  );
};
