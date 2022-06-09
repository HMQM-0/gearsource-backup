import { Button, Drawer } from "@mui/material";
import { useAuth, useCart, useCheckout } from "@nautical/react";
import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath, Link } from "react-router-dom";
import { Loader, Offline, OfflinePlaceholder, Online } from "..";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CloseIcon from "@mui/icons-material/Close";
import ProductList from "../OverlayManager/Cart/ProductList";
import { commonMessages } from "@temp/intl";
import { TaxedMoney } from "@components/containers";
// import {
//     generateMicrositeUrl,
//     getDBIdFromGraphqlId,
//     getMicrositeId,
//     getMicrositeSlug,
//     isMicrosite,
//   } from "@temp/core/utils";
import {
  cartUrl,
  checkoutLoginUrl,
  checkoutUrl,
  // micrositeCartUrl,
} from "@temp/app/routes";
import Empty from "../OverlayManager/Cart/Empty";

interface IDrawerCartProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;
  close(): void;
}

const DrawerCart: React.FunctionComponent<IDrawerCartProps> = (props) => {
  const { anchor, open, close } = props;
  const { user } = useAuth();
  const { checkout } = useCheckout();
  const {
    items,
    removeItem,
    subtotalPrice,
    shippingPrice,
    discount,
    totalPrice,
  } = useCart();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const missingVariants = () => {
    return items.find((item) => !item.variant || !item.totalPrice);
  };

  const itemsQuantity =
    items?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) || 0;

  return (
    <Drawer anchor={anchor} open={open} ModalProps={{ onBackdropClick: close }}>
      <Online>
        <Box className="cart">
          <Box className="overlay__header">
            <LocalMallIcon
              className="overlay__header__cart-icon"
              color="secondary"
            />
            <Box className="overlay__header-text">
              <FormattedMessage defaultMessage="My cart," />{" "}
              <Box component="span" className="overlay__header-text-items">
                <FormattedMessage
                  defaultMessage="{itemsQuantity,plural,one{{itemsQuantity} item} other{{itemsQuantity} items}}"
                  description="items quantity in cart"
                  values={{
                    itemsQuantity,
                  }}
                />
              </Box>
            </Box>
            <CloseIcon
              onClick={close}
              className="overlay__header__close-icon"
            />
          </Box>
          {items?.length ? (
            <>
              {missingVariants() ? (
                <Loader full />
              ) : (
                <>
                  <ProductList lines={items} remove={removeItem} />
                  <Box className="cart__footer">
                    <Box className="cart__footer__price">
                      <Box component="span">
                        <FormattedMessage {...commonMessages.subtotal} />
                      </Box>
                      <Box component="span">
                        <TaxedMoney
                          data-test="subtotalPrice"
                          taxedMoney={subtotalPrice}
                        />
                      </Box>
                    </Box>

                    {shippingTaxedPrice &&
                      shippingTaxedPrice.gross.amount !== 0 && (
                        <Box className="cart__footer__price">
                          <Box component="span">
                            <FormattedMessage {...commonMessages.shipping} />
                          </Box>
                          <Box component="span">
                            <TaxedMoney
                              data-test="shippingPrice"
                              taxedMoney={shippingTaxedPrice}
                            />
                          </Box>
                        </Box>
                      )}

                    {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                      <Box className="cart__footer__price">
                        <Box component="span">
                          <FormattedMessage {...commonMessages.promoCode} />
                        </Box>
                        <Box component="span">
                          <TaxedMoney
                            data-test="promoCodePrice"
                            taxedMoney={promoTaxedPrice}
                          />
                        </Box>
                      </Box>
                    )}

                    <Box className="cart__footer__price">
                      <Box component="span">
                        <FormattedMessage {...commonMessages.total} />
                      </Box>
                      <Box component="span">
                        <TaxedMoney
                          data-test="totalPrice"
                          taxedMoney={totalPrice}
                        />
                      </Box>
                    </Box>

                    <Box className="cart__footer__button">
                      <Link
                        to={
                          // !!isMicrosite()
                          //   ? generatePath(micrositeCartUrl, {
                          //       micrositeId: String(getDBIdFromGraphqlId(
                          //         getMicrositeId(),
                          //         "Microsite"
                          //       )),
                          //       micrositeSlug: getMicrositeSlug(),
                          //       token: null,
                          //     })
                          //   : generatePath(cartUrl, {
                          generatePath(cartUrl, {
                            token: null,
                          })
                        }
                      >
                        <Button
                          className="drawer-button"
                          variant="outlined"
                          color="secondary"
                          onClick={close}
                        >
                          <FormattedMessage defaultMessage="Go to my cart" />
                        </Button>
                      </Link>
                    </Box>
                    <Box className="cart__footer__button">
                      <Link
                        to={
                          // !!isMicrosite()
                          //   ? user
                          //     ? `${generateMicrositeUrl(
                          //         getMicrositeId(),
                          //         getMicrositeSlug()
                          //       )}checkout/`
                          //     : `${generateMicrositeUrl(
                          //         getMicrositeId(),
                          //         getMicrositeSlug()
                          //       )}login/`
                          //   : user
                          user ? checkoutUrl : checkoutLoginUrl
                        }
                      >
                        <Button
                          className="drawer-button"
                          variant="contained"
                          color="secondary"
                          onClick={close}
                        >
                          <FormattedMessage {...commonMessages.checkout} />
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </>
              )}
            </>
          ) : (
            <Empty overlayHide={close} />
          )}
        </Box>
      </Online>
      <Offline>
        <Box className="cart">
          <OfflinePlaceholder />
        </Box>
      </Offline>
    </Drawer>
  );
};

export default DrawerCart;
