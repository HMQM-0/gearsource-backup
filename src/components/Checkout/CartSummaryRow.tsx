import { TaxedMoney } from "@components/containers";
import { CachedImage } from "@components/molecules";
import { Box, Card, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { commonMessages } from "@temp/intl";
import { IImage, ITaxedMoney } from "@types";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import isEqual from "lodash/isEqual";

interface ICartSummaryRowProps {
  index?: number;
  name: string;
  variant?: string;
  sku: string;
  quantity: number;
  price: ITaxedMoney;
  priceUndiscounted?: ITaxedMoney;
  thumbnail?: IImage;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    gap: 16,
    // gridTemplateColumns: '72px 1fr 25%',
    marginBottom: 8,
    marginTop: 8,
    "&:first-child": {
      marginTop: 16,
    },
    "&:last-child": {
      marginBottom: 16,
    },
  },
  card: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    flexShrink: 0,
    padding: 6,
    width: 84,
    height: 84,
    "& img": {
      maxHeight: 72,
      maxWidth: 72,
    },
  },
  title: {
    fontSize: "0.875rem",
  },
  caption: {
    color: theme.palette.grey[600],
    fontSize: "0.875rem",
    fontWeight: "lighter",
  },
  cost: {
    color: theme.palette.grey[800],
    fontSize: "0.95rem",
    fontWeight: 600,
    textAlign: "right",
    marginLeft: "auto",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const CartSummaryRow: React.FunctionComponent<ICartSummaryRowProps> = (
  props
) => {
  // @ts-ignore
  const {
    // index,
    sku,
    name,
    variant,
    price,
    priceUndiscounted,
    quantity,
    thumbnail,
  } = props;
  const classes = useStyles(props);
  return (
    <Box key={sku} className={classes.root}>
      <Card elevation={0} variant="outlined" square className={classes.card}>
        <CachedImage data-test="image" {...thumbnail} />
      </Card>
      <Box className={classes.info}>
        <Box>
          <Typography className={classes.title}>{name}</Typography>
          <Typography className={classes.caption}>
            <Box component="span">{variant}</Box>
          </Typography>
        </Box>
        <Box className={classes.caption}>
          <FormattedMessage {...commonMessages.quantity} />
          {": "}
          <Box component="span" data-test="quantity">
            {quantity}
          </Box>
        </Box>
      </Box>
      <Typography className={classes.cost}>
        {isEqual(price, priceUndiscounted) ? (
          <TaxedMoney taxedMoney={price} />
        ) : (
          <>
            <Typography style={{ textDecoration: "line-through" }}>
              <TaxedMoney taxedMoney={priceUndiscounted} />
            </Typography>
            <TaxedMoney taxedMoney={price} />
          </>
        )}
      </Typography>
    </Box>
  );
};

export default CartSummaryRow;
