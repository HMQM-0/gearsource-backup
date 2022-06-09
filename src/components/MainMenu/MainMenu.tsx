import React from "react";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";
// import { useAuth, useCart } from "@nautical/sdk";
import { useAuth, useCart } from "@nautical/react";
import { Box } from "@mui/material";
import Media from "react-media";
import { Link } from "react-router-dom";

import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";
import * as appPaths from "../../app/routes";
import {
  maybe,
  // isMicrosite,
  // getMicrositeId,
  // generateMicrositeUrl,
  // getMicrositeSlug,
} from "../../core/utils";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";

// import heartImg from "../../images/heart.svg"
// import cartImg from "../../images/cart.svg";
// import hamburgerHoverImg from "../../images/hamburger-hover.svg";
// import hamburgerImg from "../../images/hamburger.svg";
import logoImg from "../../images/logo.svg";
// import searchImg from "../../images/search.svg";
// import userImg from "../../images/user.svg";
import {
  mediumScreen,
  smallScreen,
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";
import { DesignerData, MenuStyle } from "./gqlTypes/MenuStyle";
// import { MenuSVG } from "./MenuSvg";

// import { TypedMicrositeQuery } from "../../views/Microsites/queries";
// import { Loader } from "@components/atoms";

// Material Icons
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const MainMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { items } = useCart();

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  function defaultStyle(data: DesignerData): MenuStyle {
    let json: MenuStyle = {
      active: true,
      barColor: "#FFF",
      borderColor: "#999",
      hoverColor: "#26b2e3",
      textColor: "#000",
    };

    if (data !== null || data !== undefined) {
      const parsed: MenuStyle = JSON.parse(data.jsonContent);
      json = parsed;
    }

    return json;
  }

  return (
    <OverlayContext.Consumer>
      {(overlayContext) => (
        <TypedMainMenuQuery renderOnError displayLoader={false}>
          {({ data }) => {
            const items = maybe(() => data.shop.navigation.main.items, []);
            const menuStyle = defaultStyle(data.designerdata);
            const mainMenuCss = {
              backgroundColor: menuStyle.barColor,
              borderColor: menuStyle.borderColor,
              color: menuStyle.textColor,
              fill: menuStyle.textColor,
            };
            return (
              <nav className="main-menu" id="header" style={mainMenuCss}>
                <Box className="main-menu__left">
                  <ul>
                    <Media
                      query={{ maxWidth: mediumScreen }}
                      render={() => (
                        <li
                          data-test="toggleSideMenuLink"
                          className="main-menu__hamburger"
                          onClick={() => {
                            overlayContext.show(
                              OverlayType.sideNav,
                              OverlayTheme.left,
                              { data: items }
                            );
                          }}
                        >
                          {/*
                          <ReactSVG
                            path={hamburgerImg}
                            className="main-menu__hamburger--icon"
                          />
                          <ReactSVG
                            path={hamburgerHoverImg}
                            className="main-menu__hamburger--hover"
                          />
                          */}
                          <MenuIcon color="action" />
                        </li>
                      )}
                    />
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() =>
                        // !!!isMicrosite() &&
                        items?.map((item) => (
                          <li
                            data-test="mainMenuItem"
                            className="main-menu__item"
                            key={item.id}
                          >
                            <NavDropdown
                              menuStyle={menuStyle}
                              overlay={overlayContext}
                              {...item}
                            />
                          </li>
                        ))
                      }
                    />
                    <Online>
                      <Media
                        query={{ maxWidth: smallScreen }}
                        render={() => (
                          <>
                            {user ? (
                              <MenuDropdown
                                suffixClass="__rightdown"
                                head={
                                  <li className="main-menu__icon main-menu__user--active">
                                    {/* <ReactSVG path={userImg} /> */}
                                    <AccountCircleOutlinedIcon color="action" />
                                  </li>
                                }
                                content={
                                  <ul className="main-menu__dropdown">
                                    <li data-test="mobileMenuMyAccountLink">
                                      <Link
                                        to={
                                          // !!isMicrosite()
                                          //   ? `${generateMicrositeUrl(
                                          //       getMicrositeId(),
                                          //       getMicrositeSlug()
                                          //     )}account/`
                                          //   : appPaths.accountUrl
                                          appPaths.accountUrl
                                        }
                                      >
                                        <FormattedMessage
                                          {...commonMessages.myAccount}
                                        />
                                      </Link>
                                    </li>
                                    <li data-test="mobileMenuOrderHistoryLink">
                                      <Link
                                        to={
                                          // !!isMicrosite()
                                          //   ? `${generateMicrositeUrl(
                                          //       getMicrositeId(),
                                          //       getMicrositeSlug()
                                          //     )}order-history/`
                                          //   : appPaths.orderHistoryUrl
                                          appPaths.orderHistoryUrl
                                        }
                                      >
                                        <FormattedMessage
                                          {...commonMessages.orderHistory}
                                        />
                                      </Link>
                                    </li>
                                    <li data-test="mobileMenuWishlistLink">
                                      <Link
                                        to={
                                          // !!isMicrosite()
                                          //   ? `${generateMicrositeUrl(
                                          //       getMicrositeId(),
                                          //       getMicrositeSlug()
                                          //     )}wishlist/`
                                          //   : appPaths.wishlistUrl
                                          appPaths.wishlistUrl
                                        }
                                      >
                                        <FormattedMessage
                                          {...commonMessages.wishlist}
                                        />
                                      </Link>
                                    </li>
                                    <li data-test="mobileMenuAddressBookLink">
                                      <Link
                                        to={
                                          // !!isMicrosite()
                                          //   ? `${generateMicrositeUrl(
                                          //       getMicrositeId(),
                                          //       getMicrositeSlug()
                                          //     )}address-book/`
                                          //   : appPaths.addressBookUrl
                                          appPaths.addressBookUrl
                                        }
                                      >
                                        <FormattedMessage
                                          {...commonMessages.addressBook}
                                        />
                                      </Link>
                                    </li>
                                    <li
                                      onClick={handleSignOut}
                                      data-test="mobileMenuLogoutLink"
                                    >
                                      <FormattedMessage
                                        {...commonMessages.logOut}
                                      />
                                    </li>
                                  </ul>
                                }
                              />
                            ) : (
                              <li
                                data-test="mobileMenuLoginLink"
                                className="main-menu__icon"
                                onClick={() =>
                                  overlayContext.show(
                                    OverlayType.login,
                                    OverlayTheme.left
                                  )
                                }
                              >
                                {/* <ReactSVG path={userImg} /> */}
                                <AccountCircleOutlinedIcon color="action" />
                              </li>
                            )}
                          </>
                        )}
                      />
                    </Online>
                  </ul>
                </Box>

                <Box
                  className="main-menu__center"
                  style={{ width: 128, textAlign: "center" }}
                >
                  {/* {!!isMicrosite() ? (
                    <TypedMicrositeQuery
                      renderOnError
                      variables={{
                        id: getMicrositeId(),
                      }}
                      displayLoader
                    >
                      {({ data, loading, error }) => {
                        if (data && !loading && !error) {
                          return data.microsite ? (
                            <Link
                              to={generateMicrositeUrl(
                                data.microsite.id,
                                data.microsite.name
                              )}
                            >
                              {data.microsite.logoImage?.url ? (
                                <img
                                  style={{ height: 60 }}
                                  src={data.microsite.logoImage?.url}
                                />
                              ) : (
                                <>
                                  <img
                                    style={{ height: 60, marginTop: 8 }}
                                    src={logoImg}
                                  />
                                </>
                              )}
                            </Link>
                          ) : (
                            <Link to={appPaths.baseUrl}>
                              <img
                                style={{ height: 60, marginTop: 8 }}
                                src={logoImg}
                              />
                            </Link>
                          );
                        }
                        return <Loader />;
                      }}
                    </TypedMicrositeQuery>
                  ) : (
                    <Link to={appPaths.baseUrl}>
                      <img style={{ height: 60, marginTop: 8 }} src={logoImg} />
                    </Link>
                  )} */}
                  <Link to={appPaths.baseUrl}>
                    <img style={{ height: 60, marginTop: 8 }} src={logoImg} />
                  </Link>
                </Box>

                <Box className="main-menu__right">
                  <ul>
                    <Online>
                      <Media
                        query={{ minWidth: smallScreen }}
                        render={() => (
                          <>
                            {user ? (
                              <MenuDropdown
                                head={
                                  <li className="main-menu__icon main-menu__user--active">
                                    {/* <ReactSVG path={userImg} /> */}
                                    <AccountCircleOutlinedIcon color="action" />
                                  </li>
                                }
                                content={
                                  <ul className="main-menu__dropdown">
                                    <li data-test="desktopMenuMyAccountLink">
                                      <Link
                                        to={
                                          // !!isMicrosite()
                                          //   ? `${generateMicrositeUrl(
                                          //       getMicrositeId(),
                                          //       getMicrositeSlug()
                                          //     )}account/`
                                          //   : appPaths.accountUrl
                                          appPaths.accountUrl
                                        }
                                      >
                                        <FormattedMessage
                                          {...commonMessages.myAccount}
                                        />
                                      </Link>
                                    </li>
                                    <li data-test="desktopMenuOrderHistoryLink">
                                      <Link
                                        to={
                                          // !!isMicrosite()
                                          //   ? `${generateMicrositeUrl(
                                          //       getMicrositeId(),
                                          //       getMicrositeSlug()
                                          //     )}order-history/`
                                          //   : appPaths.orderHistoryUrl
                                          appPaths.orderHistoryUrl
                                        }
                                      >
                                        <FormattedMessage
                                          {...commonMessages.orderHistory}
                                        />
                                      </Link>
                                    </li>
                                    <li data-test="desktopMenuWishlistLink">
                                      <Link
                                        to={
                                          // !!isMicrosite()
                                          //   ? `${generateMicrositeUrl(
                                          //       getMicrositeId(),
                                          //       getMicrositeSlug()
                                          //     )}wishlist/`
                                          //   : appPaths.wishlistUrl
                                          appPaths.wishlistUrl
                                        }
                                      >
                                        <FormattedMessage
                                          {...commonMessages.wishlist}
                                        />
                                      </Link>
                                    </li>
                                    <li data-test="desktopMenuAddressBookLink">
                                      <Link
                                        to={
                                          // !!isMicrosite()
                                          //   ? `${generateMicrositeUrl(
                                          //       getMicrositeId(),
                                          //       getMicrositeSlug()
                                          //     )}address-book/`
                                          //   : appPaths.addressBookUrl
                                          appPaths.addressBookUrl
                                        }
                                      >
                                        <FormattedMessage
                                          {...commonMessages.addressBook}
                                        />
                                      </Link>
                                    </li>
                                    <li
                                      onClick={handleSignOut}
                                      data-test="desktopMenuLogoutLink"
                                    >
                                      <FormattedMessage
                                        {...commonMessages.logOut}
                                      />
                                    </li>
                                  </ul>
                                }
                              />
                            ) : (
                              <li
                                data-test="desktopMenuLoginOverlayLink"
                                className="main-menu__icon"
                                onClick={() =>
                                  overlayContext.show(
                                    OverlayType.login,
                                    OverlayTheme.right
                                  )
                                }
                              >
                                {/* <ReactSVG path={userImg} /> */}
                                <AccountCircleOutlinedIcon color="action" />
                              </li>
                            )}
                          </>
                        )}
                      />
                      <li
                        data-test="menuCartOverlayLink"
                        className="main-menu__icon main-menu__cart"
                        onClick={() => {
                          overlayContext.show(
                            OverlayType.cart,
                            OverlayTheme.right
                          );
                        }}
                      >
                        {/* <MenuSVG menuStyle={menuStyle} path={cartImg} /> */}
                        <LocalMallOutlinedIcon color="action" />
                        {cartItemsQuantity > 0 ? (
                          <Box
                            component="span"
                            className="main-menu__cart__quantity"
                          >
                            {cartItemsQuantity}
                          </Box>
                        ) : null}
                      </li>
                      {/* <li
                        data-test="menuWishlistOverlayLink"
                        className="main-menu__icon main-menu__wishlist"
                      >
                        <Link to={"/wishlist"}>
                          <MenuSVG menuStyle={menuStyle} path={heartImg} />
                        </Link>
                      </li> */}
                    </Online>
                    <Offline>
                      <li className="main-menu__offline">
                        <Media
                          query={{ minWidth: mediumScreen }}
                          render={() => (
                            <Box component="span">
                              <FormattedMessage defaultMessage="Offline" />
                            </Box>
                          )}
                        />
                      </li>
                    </Offline>
                    <li className="main-menu__search">
                      <Link
                        to={
                          // !!isMicrosite()
                          //   ? `${generateMicrositeUrl(
                          //       getMicrositeId(),
                          //       getMicrositeSlug()
                          //     )}search/?q=search`
                          //   : "/search/?q=search"
                          "/search/?q=search"
                        }
                      >
                        <Media
                          query={{ minWidth: mediumScreen }}
                          render={() => <Box component="span">Search</Box>}
                        />
                        {/* <MenuSVG menuStyle={menuStyle} path={searchImg} /> */}
                        <SearchIcon color="action" />
                      </Link>
                    </li>
                  </ul>
                </Box>
              </nav>
            );
          }}
        </TypedMainMenuQuery>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
