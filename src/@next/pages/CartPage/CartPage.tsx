// import { useAuth, useCart, useCheckout } from "@nautical/sdk";
import { useAuth, useCart, useCheckout } from "@nautical/react";
// import { History } from "history";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { CartFooter, CartHeader } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { CartRow } from "@components/organisms";
import { Cart, CartEmpty } from "@components/templates";
// import { IItems } from "@nautical/sdk/lib/api/Cart/types";
import { IItems } from "@nautical/api/Cart/types";
// import { UserDetails_me } from "@nautical/sdk/lib/queries/gqlTypes/UserDetails";
import { UserDetails_me } from "@nautical/queries/gqlTypes/UserDetails";
import { BASE_URL } from "@temp/core/config";
import { checkoutMessages } from "@temp/intl";
import { ITaxedMoney } from "@types";

// import {
//   generateMicrositeUrl,
//   getMicrositeId,
//   getMicrositeSlug,
//   isMicrosite,
// } from "@temp/core/utils";

const title = (
  <h1 data-test="cartPageTitle">
    <FormattedMessage defaultMessage="My Cart" />
  </h1>
);

const getShoppingButton = (navigate: any) => (
  <Button
    // testingContext="cartPageContinueShoppingButton"
    onClick={() =>
      navigate(
        // !!isMicrosite()
        //   ? generateMicrositeUrl(getMicrositeId(), getMicrositeSlug())
        //   : BASE_URL
        BASE_URL
      )
    }
  >
    <FormattedMessage {...checkoutMessages.continueShopping} />
  </Button>
);

const getCheckoutButton = (navigate: any, user?: UserDetails_me | null) => (
  <Button
    variant="contained"
    color="secondary"
    // testingContext="proceedToCheckoutButton"
    onClick={() =>
      navigate(
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
        user ? `/checkout/` : `/login/`
      )
    }
  >
    <FormattedMessage defaultMessage="PROCEED TO CHECKOUT" />
  </Button>
);

const cartHeader = <CartHeader />;

const prepareCartFooter = (
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null
) => (
  <CartFooter
    subtotalPrice={
      <TaxedMoney data-test="subtotalPrice" taxedMoney={subtotalPrice} />
    }
    totalPrice={<TaxedMoney data-test="totalPrice" taxedMoney={totalPrice} />}
    shippingPrice={
      shippingTaxedPrice &&
      shippingTaxedPrice.gross.amount !== 0 && (
        <TaxedMoney data-test="shippingPrice" taxedMoney={shippingTaxedPrice} />
      )
    }
    discountPrice={
      promoTaxedPrice &&
      promoTaxedPrice.gross.amount !== 0 && (
        <TaxedMoney data-test="discountPrice" taxedMoney={promoTaxedPrice} />
      )
    }
  />
);

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any
) => {
  return items?.map(({ id, variant, quantity, totalPrice }, index) => (
    <CartRow
      key={id ? `id-${id}` : `idx-${index}`}
      index={index}
      id={variant?.product?.id || ""}
      name={variant?.product?.name || ""}
      variant={variant}
      maxQuantity={variant.quantityAvailable || quantity}
      quantity={quantity}
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={(quantity) => updateItem(variant.id, quantity)}
      thumbnail={{
        ...variant?.product?.thumbnail,
        alt: variant?.product?.thumbnail?.alt || "",
      }}
      totalPrice={<TaxedMoney taxedMoney={totalPrice} />}
      unitPrice={<TaxedMoney taxedMoney={variant?.pricing?.price} />}
      sku={variant.sku}
      attributes={variant.attributes?.map((attribute) => {
        return {
          attribute: {
            id: attribute.attribute.id,
            name: attribute.attribute.name || "",
          },
          values: attribute.values.map((value) => {
            return {
              id: value?.id,
              name: value?.name || "",
              value: value?.value,
            };
          }),
        };
      })}
    />
  ));
};

export const CartPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { checkout } = useCheckout();
  const {
    loaded,
    removeItem,
    updateItem,
    items,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
  } = useCart();

  const shippingTaxedPrice =
    // checkout?.shippingMethod?.id && shippingPrice
    checkout?.sellerShippingMethods &&
    checkout?.sellerShippingMethods.length > 5 &&
    shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  if (loaded && items?.length) {
    return (
      <Cart
        title={title}
        button={getCheckoutButton(navigate, user)}
        cartHeader={cartHeader}
        cartFooter={prepareCartFooter(
          totalPrice,
          shippingTaxedPrice,
          promoTaxedPrice,
          subtotalPrice
        )}
        cart={items && generateCart(items, removeItem, updateItem)}
      />
    );
  }
  return <CartEmpty button={getShoppingButton(navigate)} />;
};
