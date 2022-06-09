import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";
import { useCart } from "@nautical/react";
import { Thumbnail } from "@components/molecules";
// import saleBadge from "@temp/images/sale_corner_red.svg";
// import SaleBadge from "@temp/_nautical/components/SaleBadge/SaleBadge";
// import ReactSVG from "react-svg";
import { TaxedMoney } from "../../@next/components/containers";
import { BasicProductFields } from "../../views/Product/gqlTypes/BasicProductFields";

import pricecapImage from "@temp/images/pricing-cap.svg";

// import * as S from "../../@next/components/molecules/ProductTile/styles";
import { AddToWishlist } from "@components/organisms";
import { Box, Card, IconButton } from "@mui/material";
import { useAlert } from "react-alert";
// import usePrice, { usePriceRange } from "@hooks/usePrice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { Variant } from "@components/molecules/commonTypes";
import { ProductVariant } from "@temp/@nautical/fragments/gqlTypes/ProductVariant";

export interface Product extends BasicProductFields {
  seller?: {
    id: string;
    companyName: string;
  };
  defaultVariant?: ProductVariant
  category?: {
    id: string;
    name: string;
  };
  pricing: {
    priceRange: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
      stop: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
    priceRangeUndiscounted: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
      stop: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
  };
}

interface ProductListItemProps {
  loginForPrice?: boolean;
  product: Product;
  style?: number;
  wide?: boolean;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  loginForPrice,
  product,
  style = 0,
  wide,
}) => {
  const { category } = product;
  const seller = product.seller?.companyName;
  const price = product.pricing?.priceRange?.start;
  const priceUndiscounted = product.pricing?.priceRangeUndiscounted?.start;
  const alert = useAlert();
  const { addItem } = useCart();

  const handleAddToCart = (event: React.MouseEvent, variantId, quantity) => {
    event.stopPropagation();
    event.preventDefault();
    if (product.isAvailableForPurchase) {
      addItem(variantId, quantity);
      // NOTE: DO NOT WANT TO SHOW CART OVERLAY EVERY TIME NEW ITEM IS ADDED, JUST
      // SHOW A NOTIFICATION THAT ITEM WAS ADDED
      // overlayContext.show(OverlayType.cart, OverlayTheme.right);
      alert.show(
        {
          title: "Added " + quantity + "x " + product.name,
        },
        { type: "success" }
      );
    } else {
      alert.show(
        {
          title: "Unavailable for purchase",
        },
        { type: "error" }
      );
    }
    
  };

  // TODO: FIX PRICING DISPLAY BUGS
  /* const price = usePrice({
    amount: product.pricing?.priceRange?.start?.net?.amount,
    baseAmount: product.pricing?.priceRangeUndiscounted?.start?.net?.amount,
    currencyCode: product?.pricing?.priceRange?.start?.net?.currency
  })

  const priceRange = usePriceRange({
    start: product?.pricing?.priceRange?.start?.net?.amount,
    stop: product?.pricing?.priceRange?.stop?.net?.amount,
    currencyCode: product?.pricing?.priceRange?.start?.net?.currency
  })

  const priceRangeUndiscounted = usePriceRange({
    start: product?.pricing?.priceRangeUndiscounted?.start?.net?.amount,
    stop: product?.pricing?.priceRangeUndiscounted?.stop?.net?.amount,
    currencyCode: product?.pricing?.priceRangeUndiscounted?.start?.net?.currency
  }) */

  const pricecap = {
    backgroundImage: `url(${pricecapImage})`,
    backgroundRepeat: "no-repeat",
    height: 30,
  };

  const getProductPrice = () => {
    if (loginForPrice) {
      return (
        <>
          <Box className="product-list-priceblock">Login for price</Box>
          <Box className="product-list-cart" style={pricecap}>
            <AddCircleIcon />
          </Box>
        </>
      );
    }

    if (isEqual(price, priceUndiscounted)) {
      return (
        <>
          <Box
            className="product-list-priceblock"
            mt={1}
            style={{ textAlign: "left" }}
          >
            <TaxedMoney taxedMoney={price} />
          </Box>
          {product.isAvailableForPurchase && 
            <Box>
              <Box style={{ position: "absolute", right: 0, bottom: -8 }}>
                <IconButton
                  color="primary"
                  onClick={(event) => {
                    handleAddToCart(event, product.defaultVariant.id, 1);
                  }}
                  aria-label="Add to Cart"
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>
            </Box>}
        </>
      );
    } else {
      return (
        <>
          <Box
            className="product-list-priceblock"
            mt={1}
            style={{ textAlign: "left" }}
          >
            <TaxedMoney taxedMoney={price} />
            &nbsp;&nbsp;
            <Box component="span" className="product-list-price-undiscounted">
              <TaxedMoney taxedMoney={priceUndiscounted} />
            </Box>
          </Box>
          {product.isAvailableForPurchase &&
            <Box>
              <Box style={{ position: "absolute", right: 0, bottom: -8 }}>
                <IconButton
                  color="primary"
                  onClick={(event) => {
                    handleAddToCart(event, product.defaultVariant.id, 1);
                  }}
                  aria-label="Add to Cart"
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>
            </Box>}
        </>
      );
    }
  };

  /*
  function getStyle() {
    switch (style) {
      case 1:
        <ProductListItemStyle1
          product={product}
          wide={wide}     
        />
        break;
      default:
        <ProductListItemDefault
          product={product}
          wide={wide}     
        />
        break;
    }
  }
  */

  return (
    <>
      <Card variant="outlined">
        <Box
          className={
            wide ? "product-list-wrapper-wide" : "product-list-wrapper"
          }
        >
          <Box style={{ position: "absolute" }}>
            <AddToWishlist productId={product.id} showButtonText={false} />
          </Box>
          <Box
            className={wide ? "product-list-image-wide" : "product-list-image"}
          >
            <Thumbnail source={product} height="255" width="255" />
          </Box>
          <h4 className="product-list-title">{product.name}</h4>
          <p className="product-list-seller">{seller}</p>
          <p className="product-list-category">{category?.name}</p>
          <Box style={{ position: "relative" }}>{getProductPrice()}</Box>
        </Box>
      </Card>
    </>
  );
};

export default ProductListItem;

/*

    <Box className={wide ? ("product-list-item-wide") : ("product-list-item") }>
      <Box className={wide ? ("product-list-wrapper-wide") : ("product-list-wrapper") }>
        <S.AddToWishlist show={true}>
          <AddToWishlist productId={product.id} showButtonText={false} />
        </S.AddToWishlist>
        <Box className={wide ? ("product-list-image-wide") : ("product-list-image") }>
          <Thumbnail source={product} />
        </Box>
        <h4 className="product-list-title">{product.name}</h4>
        <p className="product-list-category">{category?.name}</p>
      </Box>
      <Box className="product-list-pricebar">{getProductPrice()}</Box>
    </Box>
*/

// {isEqual(price, priceUndiscounted) ? (''): (<ReactSVG path={saleBadge} className="product-list-item__salebadge" />)}

/*

  <SaleBadge disabled={isEqual(price, priceUndiscounted)} type="badge" />

  return (
    <Box className="product-list-item">
      <SaleBadge disabled={isEqual(price, priceUndiscounted)} type="badge" />
      <Box className="product-list-item__image">
        <Thumbnail source={product} />
      </Box>
      <h4 className="product-list-item__title">{product.name}</h4>
      <p className="product-list-item__category">{category?.name}</p>
      <p className="product-list-item__price">{getProductPrice()}</p>
    </Box>
  );





import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";

import { Thumbnail } from "@components/molecules";
// import saleBadge from "@temp/images/sale_corner_red.svg";
import SaleBadge from "@temp/_nautical/components/SaleBadge/SaleBadge";
// import ReactSVG from "react-svg";
import { TaxedMoney } from "../../@next/components/containers";
import { BasicProductFields } from "../../views/Product/gqlTypes/BasicProductFields";

export interface Product extends BasicProductFields {
  category?: {
    id: string;
    name: string;
  };
  pricing: {
    priceRange: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
    priceRangeUndiscounted: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
  };
}

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { category } = product;
  const price = product.pricing?.priceRange?.start;
  const priceUndiscounted = product.pricing?.priceRangeUndiscounted?.start;

  const getProductPrice = () => {
    if (isEqual(price, priceUndiscounted)) {
      return <TaxedMoney taxedMoney={price} />;
    } else {
      return (
        <>
          <Box component="span" className="product-list-item__undiscounted_price">
            <TaxedMoney taxedMoney={priceUndiscounted} />
          </Box>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TaxedMoney taxedMoney={price} />
        </>
      );
    }
  };
  return (
    <Box className="product-list-item">
      <SaleBadge disabled={isEqual(price, priceUndiscounted)} type="corner" />
      <Box className="product-list-item__image">
        <Thumbnail source={product} />
      </Box>
      <h4 className="product-list-item__title">{product.name}</h4>
      <p className="product-list-item__category">{category?.name}</p>
      <p className="product-list-item__price">{getProductPrice()}</p>
    </Box>
  );
};

export default ProductListItem;

// {isEqual(price, priceUndiscounted) ? (''): (<ReactSVG path={saleBadge} className="product-list-item__salebadge" />)}

*/
