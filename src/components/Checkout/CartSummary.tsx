// import Media from 'react-media';
// import { makeStyles } from "@mui/styles";
import Media from "react-media";
import { IProduct } from "./types";
import { ITaxedMoney } from "@types";
import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import { useCheckout } from "@nautical/react";
import CartSummaryRow from "./CartSummaryRow";
import CartSummaryFooter from "./CartSummaryFooter";
import { TaxedMoney } from "@components/containers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import { ICheckoutModelPriceValue } from "@temp/@nautical/helpers";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useAlert } from "react-alert";
import { maybe } from "@utils/misc";
import { useIntl } from "react-intl";
import { checkoutMessages, commonMessages } from "@temp/intl";

const useStyles = makeStyles((theme: Theme) => ({
  accordion: {
    backgroundColor: "transparent",
    padding: 0,
  },
  accordionSummary: {
    "& .MuiAccordionSummary-content": {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  checkoutWrapper: {
    background: "linear-gradient(90deg, #FFF 50%, #F8FAFB 50%)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  discountChip: {
    marginBottom: "16px",
  },
  priceButton: {
    borderRadius: 8,
    borderWidth: "0.5px !important",
    borderColor: `${theme.palette.divider}`,
  },
  promoCodeContainer: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gridColumnGap: theme.spacing(1),
    marginBottom: "16px",
    marginTop: "16px",
  },
  root: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
      marginBottom: theme.spacing(0),
    },
  },
}));

interface ICartSummaryProps {
  subtotal: ITaxedMoney | null | undefined;
  promoCode: ITaxedMoney | null | undefined;
  shipping: ITaxedMoney | null | undefined;
  total: ITaxedMoney | null | undefined;
  volumeDiscount?: ICheckoutModelPriceValue | undefined;
  products?: IProduct[] | null;
  loyaltyPoints?: React.ReactNode;
  onPaymentStep?: boolean;
}

const CartSummary: React.FunctionComponent<ICartSummaryProps> = (props) => {
  const {
    products,
    subtotal,
    promoCode,
    shipping,
    total,
    volumeDiscount,
    // onPaymentStep,
    loyaltyPoints,
  } = props;
  const [code, setCode] = React.useState(null);
  const [promoCodeError, setPromoCodeError] = React.useState<string | null>(
    null
  );
  const classes = useStyles();
  const alert = useAlert();
  const { promoCodeDiscount, addPromoCode, removePromoCode, checkout } =
    useCheckout();
  const intl = useIntl();

  const handleAddPromoCode = async () => {
    setPromoCodeError(null);
    const promoResult = await addPromoCode(code);
    if (promoResult?.dataError?.error) {
      const messages = maybe(
        () => promoResult.dataError.error.flatMap((error) => error.message),
        []
      );
      setPromoCodeError(messages.join(" \n"));
      alert.show(
        {
          title: "Could not add promo code",
        },
        { type: "error" }
      );
    } else {
      alert.show(
        {
          title: "Added promo code",
        },
        { type: "success" }
      );
    }
  };

  const handleRemovePromoCode = async () => {
    const promoResult = await removePromoCode(promoCodeDiscount.voucherCode);
    if (promoResult?.dataError?.error) {
      alert.show(
        {
          title: "Could not remove promo code",
        },
        { type: "error" }
      );
    } else {
      alert.show(
        {
          title: "Removed promo code",
        },
        { type: "success" }
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Media queries={{ small: { maxWidth: 599 } }}>
        {(matches) => (
          <Fragment>
            {matches.small ? (
              <>
                <Accordion
                  elevation={0}
                  disableGutters
                  className={classes.accordion}
                >
                  <AccordionSummary className={classes.accordionSummary}>
                    {!!checkout?.id ? (
                      <Button
                        color="primary"
                        variant="text"
                        style={{
                          paddingLeft: 0,
                        }}
                        startIcon={
                          <AddIcon style={{ height: 16, width: 16 }} />
                        }
                      >
                        {intl.formatMessage(checkoutMessages.discount)}
                      </Button>
                    ) : (
                      <Typography className={classes.title} variant="h6">
                        {intl.formatMessage(checkoutMessages.shoppingCart)}
                      </Typography>
                    )}
                    <Button
                      className={classes.priceButton}
                      color="inherit"
                      variant="outlined"
                      startIcon={
                        <ShoppingCartIcon style={{ height: 16, width: 16 }} />
                      }
                    >
                      <TaxedMoney taxedMoney={total} />
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider />
                    <Box>
                      <Box>
                        {products?.map((product, index) => (
                          <Box key={product.sku}>
                            <Box>
                              <CartSummaryRow
                                index={index}
                                sku={product.sku}
                                quantity={product.quantity}
                                variant={product.variant}
                                name={product.name}
                                price={product.price}
                                priceUndiscounted={product.priceUndiscounted}
                                thumbnail={product.thumbnail}
                              />
                            </Box>
                            <Divider />
                          </Box>
                        ))}
                      </Box>
                      {!!checkout &&
                        (loyaltyPoints ? (
                          <Box style={{ marginTop: "30px " }}>
                            {loyaltyPoints}
                          </Box>
                        ) : (
                          checkout.id && (
                            <Box>
                              <Box className={classes.promoCodeContainer}>
                                <TextField
                                  onChange={(event) =>
                                    setCode(event.target.value)
                                  }
                                  placeholder={intl.formatMessage(
                                    commonMessages.promoCode
                                  )}
                                  value={code}
                                />
                                <Button onClick={handleAddPromoCode}>
                                  {intl.formatMessage(commonMessages.apply)}
                                </Button>
                              </Box>
                              {promoCodeError && (
                                <Box style={{ marginBottom: "16px" }}>
                                  <Alert severity="error">
                                    {promoCodeError}
                                  </Alert>
                                </Box>
                              )}
                              {promoCodeDiscount.voucherCode && (
                                <Chip
                                  className={classes.discountChip}
                                  label={promoCodeDiscount.discountName}
                                  // onClick={handleClick}
                                  onDelete={handleRemovePromoCode}
                                />
                              )}
                              <Divider />
                            </Box>
                          )
                        ))}
                      <CartSummaryFooter
                        subtotal={subtotal}
                        total={total}
                        shipping={shipping}
                        promoCode={promoCode}
                        volumeDiscount={volumeDiscount}
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </>
            ) : (
              <>
                <Typography className={classes.title} variant="h6">
                  {intl.formatMessage(checkoutMessages.shoppingCart)}
                </Typography>
                <Divider />
                <Box>
                  <Box>
                    {products?.map((product, index) => (
                      <Box key={product.sku}>
                        <Box>
                          <CartSummaryRow
                            index={index}
                            sku={product.sku}
                            quantity={product.quantity}
                            variant={product.variant}
                            name={product.name}
                            price={product.price}
                            priceUndiscounted={product.priceUndiscounted}
                            thumbnail={product.thumbnail}
                          />
                        </Box>
                        <Divider />
                      </Box>
                    ))}
                  </Box>
                  {!!checkout &&
                    (loyaltyPoints ? (
                      <Box style={{ marginTop: "30px" }}>{loyaltyPoints}</Box>
                    ) : (
                      checkout.id && (
                        <Box>
                          <Box className={classes.promoCodeContainer}>
                            <TextField
                              onChange={(event) => setCode(event.target.value)}
                              placeholder={intl.formatMessage(
                                commonMessages.promoCode
                              )}
                              value={code}
                            />
                            <Button onClick={handleAddPromoCode}>
                              {intl.formatMessage(commonMessages.apply)}
                            </Button>
                          </Box>
                          {promoCodeError && (
                            <Box style={{ marginBottom: "16px" }}>
                              <Alert severity="error">{promoCodeError}</Alert>
                            </Box>
                          )}
                          {promoCodeDiscount.voucherCode && (
                            <Chip
                              className={classes.discountChip}
                              label={promoCodeDiscount.discountName}
                              // onClick={handleClick}
                              onDelete={handleRemovePromoCode}
                            />
                          )}
                          <Divider />
                        </Box>
                      )
                    ))}
                  <CartSummaryFooter
                    subtotal={subtotal}
                    total={total}
                    shipping={shipping}
                    promoCode={promoCode}
                    volumeDiscount={volumeDiscount}
                  />
                </Box>
              </>
            )}
          </Fragment>
        )}
      </Media>
    </Box>
  );
};

export default CartSummary;
