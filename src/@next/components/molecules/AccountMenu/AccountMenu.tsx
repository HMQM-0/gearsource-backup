import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { commonMessages } from "@temp/intl";
import * as S from "./styles";
import { IProps } from "./types";
import { isMicrosite } from "@temp/core/utils";

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  const intl = useIntl();
  return (
    <S.Wrapper>
      <S.MenuHeader>
        <FormattedMessage {...commonMessages.myAccount} />
      </S.MenuHeader>
      {links.map((link) => {
        const menuItem = !!isMicrosite()
          ? link.match(/(?:account|order-history|wishlist|address-book)/g)![0]
          : link
              .replace(/\//g, "")
              .replace("-", " ")
              .split(" ")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ");
        let menuItemTrans = menuItem;

        /* eslint-disable default-case */
        switch (menuItem) {
          case "Account":
            menuItemTrans = intl.formatMessage(commonMessages.account);
            break;
          case "account":
            menuItemTrans = intl.formatMessage(commonMessages.account);
            break;
          case "Order History":
            menuItemTrans = intl.formatMessage(commonMessages.orderHistory);
            break;
          case "order-history":
            menuItemTrans = intl.formatMessage(commonMessages.orderHistory);
            break;
          case "Wishlist":
            menuItemTrans = intl.formatMessage(commonMessages.wishlist);
            break;
          case "wishlist":
            menuItemTrans = intl.formatMessage(commonMessages.wishlist);
            break;
          case "Address Book":
            menuItemTrans = intl.formatMessage(commonMessages.addressBook);
            break;
          case "address-book":
            menuItemTrans = intl.formatMessage(commonMessages.addressBook);
            break;
        }
        return (
          <Link
            to={link}
            key={link}
            data-test="accountMenuLink"
            data-test-id={link}
          >
            <S.MenuItem active={active === link}>{menuItemTrans}</S.MenuItem>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
