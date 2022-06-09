import React from "react";
import { makeStyles } from "@mui/styles";
import MuiCheckout from "@temp/components/Checkout/Checkout";
import { brandingQuery } from "../../../app/queries";
import logoImg from "@temp/images/wine-logo.png";
import { useCart, useCheckout } from "@nautical/react";
import { ITaxedMoney } from "@types";
import { Box, Modal } from "@mui/material";
import { useQuery } from "@apollo/client";
import { maybe } from "@utils/misc";
import Loader from "@temp/components/Loader";

const convertToTaxedMoney = (value: ITaxedMoney | null | undefined) => {
  const converted = value;
  return converted;
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    height: "100vh",
    width: "100vw",
    // @ts-ignore
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  wrapper: {
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    outline: 0,
  },
  loaderWrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    display: "block",
    width: "100vw",
    height: "100vh",
    outline: 0,
    // Safari v15.5 fix
    // For some reason, the style in the modal is not rendered without the transform
    transform: "scale(1)",
    "& .MuiBackdrop-root": {
      backgroundColor: "white",
      outline: 0,
    },
  },
}));

interface ICheckoutProps {
  logo?: React.ReactNode;
}

const CheckoutPage: React.FC<ICheckoutProps> = () => {
  const classes = useStyles();

  const [modal, setModal] = React.useState(true);

  const {
    loaded: cartLoaded,
    shippingPrice,
    discount,
    subtotalPrice,
    totalPrice,
    items,
  } = useCart();

  const {
    loaded: checkoutLoaded,
    checkout,
    applicableVolumeDiscounts,
  } = useCheckout();

  const shippingTaxedPrice =
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

  // QUERIES
  const { data, loading } = useQuery(brandingQuery, {
    fetchPolicy: "cache-and-network",
  });
  const logo = data?.branding?.logo ? (
    <img
      src={data.branding.logo.url}
      width={maybe(() => data.branding.logoWidth, 188)}
      height={maybe(() => data.branding.logoHeight, 28)}
      alt="Logo"
    />
  ) : (
    <img style={{ height: 28 }} src={logoImg} />
  );

  return (
    <>
      <Modal open={modal} className={classes.modal}>
        <div className={classes.wrapper}>
          <Box className={classes.backdrop}>
            {!checkoutLoaded || !cartLoaded || loading ? (
              <div className={classes.loaderWrapper}>
                <Loader />
              </div>
            ) : (
              <MuiCheckout
                items={items}
                logo={logo}
                subtotal={convertToTaxedMoney(subtotalPrice)}
                promoCode={convertToTaxedMoney(promoTaxedPrice)}
                shipping={convertToTaxedMoney(shippingTaxedPrice)}
                volumeDiscount={applicableVolumeDiscounts}
                total={convertToTaxedMoney(totalPrice)}
                close={() => setModal(false)}
              />
            )}
          </Box>
        </div>
      </Modal>
    </>
  );
};

export { CheckoutPage };
