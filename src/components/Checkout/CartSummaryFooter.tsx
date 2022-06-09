import { Money, TaxedMoney } from "@components/containers";
import { Box, Divider, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ICheckoutModelPriceValue } from "@temp/@nautical/helpers";
import { commonMessages } from "@temp/intl";
import { ITaxedMoney } from "@types";
import clsx from "clsx";
import * as React from "react";
import { useIntl } from "react-intl";

interface ICartSummaryFooterProps {
  subtotal: ITaxedMoney;
  promoCode: ITaxedMoney;
  shipping: ITaxedMoney;
  total: ITaxedMoney;
  volumeDiscount?: ICheckoutModelPriceValue | undefined;
}

interface ICostLineProps {
  name: string;
  cost?: ITaxedMoney;
  volumeDiscount?: ICheckoutModelPriceValue | undefined;
  last?: boolean;
  negative?: boolean;
}

function calculateTax(value: ITaxedMoney | null | undefined) {
  let taxes: ITaxedMoney = {
    gross: {
      amount: 0,
      currency: "USD",
    },
    net: {
      amount: 0,
      currency: "USD",
    },
  };
  if (value === null || value === undefined) {
    return taxes;
  } else {
    taxes = {
      gross: {
        amount: value.gross.amount - value.net.amount,
        currency: value.gross.currency,
      },
      net: {
        amount: value.gross.amount - value.net.amount,
        currency: value.net.currency,
      },
    };
    return taxes;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  bigStyle: {
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  currencyStyle: {
    fontSize: "0.75rem !important",
    fontWeight: 400,
    marginRight: 8,
    alignSelf: "center",
  },
  numberStyle: {
    fontWeight: 600,
  },
  lastFont: {
    fontSize: "0.95rem",
  },
  otherFont: {
    color: theme.palette.grey[600],
    fontSize: "0.875rem",
  },
  footerFlex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
  },
}));

// function getCurrency(value: ITaxedMoney) {
//   return value.gross.currency;
// }

const CostLine: React.FunctionComponent<ICostLineProps> = (props) => {
  const { name, cost, volumeDiscount, last = false, negative = false } = props;
  const classes = useStyles(props);

  return (
    <>
      {last ? <Divider /> : ""}
      <Box
        className={clsx(
          last ? classes.lastFont : classes.otherFont,
          classes.footerFlex
        )}
      >
        <Box component="span">{name}</Box>
        <Box
          component="span"
          data-test={`cartSummaryCost${name.replace(/\s/g, "")}`}
          className={last ? classes.bigStyle : classes.numberStyle}
        >
          {/* {last ? (
            <span className={classes.currencyStyle}>{getCurrency(cost)}</span>
          ) : (
            ""
          )} */}
          {negative && "- "}
          {cost ? (
            <TaxedMoney taxedMoney={cost} />
          ) : (
            <Money money={volumeDiscount} />
          )}
        </Box>
      </Box>
    </>
  );
};

const CartSummaryFooter: React.FunctionComponent<ICartSummaryFooterProps> = (
  props
) => {
  const { subtotal, promoCode, shipping, total, volumeDiscount } = props;
  const intl = useIntl();

  return (
    <Box>
      {subtotal && (
        <CostLine
          name={intl.formatMessage(commonMessages.subtotal)}
          cost={subtotal}
        />
      )}
      {shipping && (
        <CostLine
          name={intl.formatMessage(commonMessages.shipping)}
          cost={shipping}
        />
      )}
      {promoCode && promoCode.gross.amount > 0 && (
        <CostLine
          name={intl.formatMessage(commonMessages.promoCode)}
          cost={promoCode}
          negative
        />
      )}
      {volumeDiscount && volumeDiscount.amount > 0 && (
        <CostLine
          name={intl.formatMessage({
            defaultMessage: "Volume Discount",
            description: "volume discount",
          })}
          volumeDiscount={volumeDiscount}
          negative
        />
      )}
      {total && (
        <CostLine
          name={intl.formatMessage({
            defaultMessage: "Taxes",
            description: "taxes",
          })}
          cost={calculateTax(total)}
        />
      )}
      {total && (
        <CostLine
          name={intl.formatMessage(commonMessages.total)}
          cost={total}
          last
        />
      )}
    </Box>
  );
};

export default CartSummaryFooter;
