// import { css, jsx } from "@emotion/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from "../../core/utils";
import {
  SecondaryMenu_shop_navigation_secondary_items,
  SecondaryMenu_shop_navigation_secondary_items_children,
} from "../Footer/gqlTypes/SecondaryMenu";
import { MainMenu_shop_navigation_main_items } from "../MainMenu/gqlTypes/MainMenu";
import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";
import { MenuStyle } from "../MainMenu/gqlTypes/MenuStyle";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item:
    | MainMenu_shop_navigation_main_items
    | MainMenuSubItem
    | SecondaryMenu_shop_navigation_secondary_items
    | SecondaryMenu_shop_navigation_secondary_items_children;
  menuStyle?: MenuStyle;
}

/*

const NavLink: React.FunctionComponent<NavLinkProps> = ({
  item,
  menuStyle,
  ...props
}) => {
  const { name, url, category, collection, page } = item;

  let linkUrl = "";

  if (category) {
    linkUrl = generateCategoryUrl(category.id, category.name);
  }

  if (collection) {
    linkUrl = generateCollectionUrl(collection.id, collection.name);
  }

  if (page) {
    linkUrl = generatePageUrl(page.slug);
  }

  if (url) {
    linkUrl = url;
  }

  return <Link to={linkUrl} {...props}>{name}</Link>;
};

export default NavLink;

*/

export const NavLink: React.FC<NavLinkProps> = ({
  item,
  menuStyle,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}) => {
  const { name, url, category, collection, page } = item;

  /* 
  const ThemedLink = css`
    color: ${maybe(
      () => menuStyle?.textColor + " !important",
      "#323232 !important"
    )};
    &:hover {
      color: ${maybe(
        () => menuStyle?.hoverColor + " !important",
        "#26b2e3 !important"
      )};
    }
  `;
  */

  const link = (url: string) => (
    <Link to={url} {...props} onClick={onClick}>
      {name}
    </Link>
  );

  if (url) {
    return (
      <a href={url} {...props} onClick={onClick}>
        {name}
      </a>
    );
  }
  if (category) {
    return (
      <Link
        to={generateCategoryUrl(category.id, category.name)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
      >
        {name}
      </Link>
    );
  }
  if (collection) {
    return link(generateCollectionUrl(collection.id, collection.name));
  }
  if (page) {
    return link(generatePageUrl(page.slug));
  }

  return (
    <Box component="span" {...props}>
      {name}
    </Box>
  );
};
