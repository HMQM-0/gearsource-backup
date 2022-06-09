import React from "react";
// import { Transition } from "react-transition-group";

// import { largeScreen } from "@styles/constants";

import { ListItem } from "./ProductSideNavbar";
// import * as S from "./styles";
import { IProps, IState } from "./types";

export const ProductSideNavbarList: React.FC<IProps> = ({
  items,
  width,
}: IProps) => {
  // @ts-ignore
  const [view, _setView] = React.useState<IState>({
    buffer: { index: null, depth: null },
    depth: null,
    index: null,
  });

  const setView = React.useCallback((state: Partial<IState>) => {
    _setView((view) => ({
      ...view,
      ...state,
      buffer: { ...view.buffer, ...state },
    }));
  }, []);

  return (
    <>
      {items?.map((item, index) => (
        <ListItem
          onClick={() => {
            setView({ index });
          }}
          item={item}
          key={index}
        />
      ))}
    </>
  );
};
