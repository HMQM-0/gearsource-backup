import * as React from "react";

import { NavLink } from "..";
import { MainMenuSubItem } from "./gqlTypes/MainMenuSubItem";
import { MenuStyle } from "./gqlTypes/MenuStyle";

interface NavNestedItemProps extends MainMenuSubItem {
  children?: NavNestedItemProps[];
  menuStyle?: MenuStyle;
  hideOverlay?(): void;
}

const NavItem: React.FC<NavNestedItemProps> = ({
  hideOverlay,
  children,
  menuStyle,
  ...item
}) => {
  const content =
    children && children.length ? (
      <ul>
        {children.map((subItem, i) => (
          <NavItem menuStyle={menuStyle} key={i} {...subItem} />
        ))}
      </ul>
    ) : null;

  return (
    <li onClick={hideOverlay}>
      <NavLink menuStyle={menuStyle} item={item} onClick={hideOverlay} />
      {content}
    </li>
  );
};

export default NavItem;
