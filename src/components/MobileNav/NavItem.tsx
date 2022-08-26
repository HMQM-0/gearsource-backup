import clsx from "clsx";
import * as React from "react";
// import { ReactSVG } from "react-svg";
import { IconButton, useTheme } from "@mui/material";
import { NavLink } from "..";
import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import subcategoriesImg from "../../images/subcategories.svg";

export interface INavItem extends MainMenuSubItem {
  children?: INavItem[];
}

interface NavItemProps extends INavItem {
  hideOverlay(): void;
  showSubItems(item: INavItem): void;
}

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  ...item
}) => {
  const [hover, setHover] = React.useState(false);
  const hasSubNavigation = item.children && !!item.children.length;
  const theme = useTheme();

  const hoverStyle = {
    color: theme.palette.secondary.main,
  };

  return (
    <li
      className={clsx({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
      })}
    >
      <NavLink
        item={item}
        className="side-nav__menu-item-link"
        onClick={hideOverlay}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={hover ? hoverStyle : { color: "inherit" }}
      />
      {hasSubNavigation && (
        <IconButton color={"primary"} onClick={() => showSubItems(item)}>
          <ArrowRightIcon fontSize="medium" />
        </IconButton>
      )}
    </li>
  );
};

export default NavItem;

/*
<ReactSVG
  src={subcategoriesImg}
  className="side-nav__menu-item-more"
  onClick={() => showSubItems(item)}
/>
*/
