// @ts-nocheck
import React from "react";
import { FC, useState, useMemo } from "react";
import { MenuItem, Select, InputLabel, Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { WishlistItem } from "@nautical/fragments/gqlTypes/WishlistItem";
import { useCart, useRemoveWishlistProduct } from "@nautical/react";
import { Box, Button } from "@mui/material";
import trash from "images/trash.svg";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  // generateMicrositeProductUrl,
  generateProductUrl,
  // getMicrositeId,
  // getMicrositeSlug,
  // isMicrosite,
} from "../../../../core/utils";
import usePrice, { usePriceRange } from "@hooks/usePrice";
import { WishlistContext } from "@temp/@nautical/react/components/WishlistProvider/context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      width: "100%",
      gap: "1.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      borderBottom: "1px solid lightgrey",
      transitionProperty:
        "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1);",
      transitionDuration: "150ms;",
    },
    image: {
      gridColumn: "span 3 / span 3",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gridColumn: "span 7 / span 7",
    },
    struckPrice: {
      textDecoration: "line-through",
    },
    trash: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gridArea: "trash",
    },
    productName: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      marginBottom: "0.5rem",
      fontWeight: 700,
      cursor: "pointer",
    },
    productDescription: {
      marginBottom: "0.5rem",
      fontSize: "1.2em",
    },
    selectLabel: {
      marginBottom: 0,
      marginTop: "0.5rem",
      fontSize: "0.85em",
    },
    select: {
      maxWidth: "24rem",
      marginBottom: "1rem",
    },
    addToCart: {
      paddingTop: "0.25rem",
      paddingBottom: "0.25rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
      marginTop: "0.75rem",
      border: "1px",
      borderRadius: "0.375rem",
      "--tw-shadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      boxShadow:
        "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      width: "max-content",
    },
    pricing: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gridColumn: "span 2 / span 2",
    },
    pricing_price: {
      display: "flex",
      justifyContent: "flex-end",
      fontWeight: 700,
    },
    pricing_trash: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

interface Props {
  item: WishlistItem;
}

const WishlistCard: FC<Props> = ({ item }) => {
  const product = item.product!;
  const [variant, setVariant] = useState(null);
  const navigate = useNavigate();
  const alert = useAlert();

  const { update } = React.useContext(WishlistContext);

  const [setRemoveWishlistProduct] = useRemoveWishlistProduct();

  const classes = useStyles();

  useMemo(() => {
    if (product.variants?.length === 1 && !variant) {
      setVariant(product.variants?.[0]);
    }
  }, [product]);

  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const { addItem } = useCart();

  // @ts-ignore
  const { price, basePrice, discount } = !variant
    ? usePrice({
        amount: product?.pricing?.priceRange?.start?.gross?.amount,
        baseAmount:
          product.pricing?.priceRangeUndiscounted?.start?.gross?.amount,
        currencyCode: product.pricing?.priceRange?.start?.currency!,
      })
    : usePrice({
        amount: variant?.pricing?.price?.gross?.amount,
        baseAmount: variant?.pricing?.priceUndiscounted?.gross?.amount,
        currencyCode: variant?.pricing?.price?.currency!,
      });

  const productPriceRange = usePriceRange({
    start: product?.pricing?.priceRange?.start?.gross?.amount,
    stop: product?.pricing?.priceRange?.stop?.gross?.amount,
    currencyCode: product?.pricing?.priceRange?.start?.gross?.currency,
  });

  const handleRemove = async () => {
    setRemoving(true);

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await setRemoveWishlistProduct({
        productId: product?.id,
      });
      update();
      setRemoving(false);
    } catch (error) {
      setRemoving(false);
    }
  };
  const addToCart = async () => {
    setLoading(true);
    if (product.isAvailableForPurchase) {
      try {
        await addItem(variant?.id!, 1);
        alert.show(
          {
            title: "Added 1x " + product.name,
          },
          { type: "success" }
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      alert.show(
        {
          title: "Unavailable for purchase",
        },
        { type: "error" }
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.image}>
        <img
          src={product.countableImages?.edges?.[0]?.node.urlOriginal!}
          width="100%"
          height="auto"
          alt={
            product.countableImages?.edges?.[0]?.node.altText || "Product Image"
          }
        />
      </Box>

      <Box className={classes.details}>
        <h3
          className={classes.productName}
          onClick={() =>
            navigate(
              generateProductUrl(item.product)
            )
          }
        >
          {product.name}
        </h3>
        {/* <Box className={classes.productDescription}>{product.description}</Box> */}
        <Box className={classes.productDescription}></Box>
        {product.variants?.length > 1 && (
          <React.Fragment>
            <InputLabel
              htmlFor={`variant${product.id}`}
              className={classes.selectLabel}
            >
              {variant ? "Variant" : "Choose Variant"}
            </InputLabel>
            <Select
              className={classes.select}
              name="variant"
              id={`variant${product.id}`}
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                style: {
                  maxHeight: 480,
                },
              }}
              onChange={(event) => {
                event.persist();
                setVariant(event.target.value);
              }}
            >
              {product.variants?.map((v: any, i: number) => {
                return <MenuItem value={v}>{v.name}</MenuItem>;
              })}
            </Select>
          </React.Fragment>
        )}
        <Button
          aria-label="Add to Cart"
          type="button"
          className={classes.addToCart}
          onClick={addToCart}
          // loading={loading}
          testingContext="addToCart"
          disabled={!variant || loading || removing}
        >
          Add to Cart
        </Button>
      </Box>
      <Box className={classes.pricing}>
        <Box className={classes.pricing_price}>
          {!variant ? (
            <Box>
              {/* product?.pricing?.priceRange?.start?.gross?.amount}&nbsp;&nbsp;-&nbsp;&nbsp;{product?.pricing?.priceRange?.stop?.gross?.amount */}
              {productPriceRange}
            </Box>
          ) : discount ? (
            <Box>
              <Box component="span" className={classes.struckPrice}>
                {basePrice}
              </Box>
              &nbsp;&nbsp;&nbsp;&nbsp;{price}
            </Box>
          ) : (
            price
          )}
        </Box>
        <Box className={classes.pricing_trash}>
          <button onClick={handleRemove}>
            <img className={classes.trash} src={trash} />
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default WishlistCard;
