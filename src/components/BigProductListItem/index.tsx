import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";
import { Box } from "@mui/material";
import { Thumbnail } from "@components/molecules";
// import saleBadge from "@temp/images/sale_corner_red.svg";
// import SaleBadge from "@temp/_nautical/components/SaleBadge/SaleBadge";
// import { ReactSVG } from "react-svg";
import { TaxedMoney } from "../../@next/components/containers";
import { BasicProductFields } from "../../views/Product/gqlTypes/BasicProductFields";
// import { ReactSVG } from "react-svg";

// import cartAddImage from "@temp/images/fa-shopping-basket-add.svg";
// import pricecapImage from "@temp/images/pricing-cap.svg";

import * as S from "../../@next/components/molecules/ProductTile/styles";
import { AddToWishlist } from "@components/organisms";
// import { string } from "yup";
// import { attributes } from "@temp/@nautical/queries/attributes";
// import { CollectionSortField } from "@temp/@nautical";
import { Attribute } from "@components/atoms";

/*
import * as X from "./styles";

export const VariantColor: React.FC<{
  color: string;
  highlight: boolean;
  onClick(): void;
}> = ({
  color,
  highlight,
}) => {
  return (
    <X.Wrap highlight={highlight}>
      <X.Swatch color={color} onClick={undefined}></X.Swatch>
    </X.Wrap>  )
};
*/

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
  variants?: Variant[] | null;
}

/* 
{
    id: string;
    name: string;
    sku: string;
    quantityAvailable: number;
    isAvailable: boolean | null;
    attributes?: [{
      attribute: {
        id: string;
        name: string;
      };
      values: [{
        id: string;
        name: string;
        value: string;
      }];
    }];
  }];
*/

interface Values {
  id: string;
  name: string;
  value: string;
  extra: string;
}

interface Attribute {
  attribute: {
    id: string;
    name: string;
  };
  values: Values[];
}

interface Variant {
  id: string;
  name: string;
  attributes: Attribute[] | null;
}

interface ProductListItemProps {
  product: Product;
  wide?: boolean;
}

const BigProductListItem: React.FC<ProductListItemProps> = ({
  product,
  wide,
}) => {
  const { category } = product;
  const price = product.pricing?.priceRange?.start;
  const priceUndiscounted = product.pricing?.priceRangeUndiscounted?.start;

  /*
  const pricecap = {
    backgroundImage: `url(${pricecapImage})`,
    backgroundRepeat: 'no-repeat',
    height: 30,
  }
  */

  function removeDuplicates(array: Values[]) {
    return array.filter((value, index) => array.indexOf(value) === index);
  }

  function getVariantColors() {
    let values: Values[] = [];
    let colors: Values[] = [];
    let empty: Values[] = [];

    // console.info("VARIANT", product.name);
    // console.info(product);

    product.variants?.flat<Variant[]>().forEach((variant) => {
      let attribute = variant.attributes.filter(
        (attribute) => attribute.attribute.id === "QXR0cmlidXRlOjE0"
      );

      attribute.flatMap((attr) => {
        values.push(...attr.values.flat());
      });

      /*
        attribute.forEach(attr => {
          // values.push(...new Set(attr.values.flat()));
          values.push(...attr.values.flat());
        })
        */
    });

    colors = removeDuplicates(values);
    // console.info(colors);

    return colors.length > 1 ? colors : empty;

    /*
      variants?.forEach(variant => {
        let attribute = variant.attributes.filter(attribute => attribute.attribute.id === "QXR0cmlidXRlOjE0");
        attribute.forEach(attr => {
          // values.push(...new Set(attr.values.flat()));
          values.push(...attr.values.flat());
        })
      });
      */

    /*
      values?.forEach(value => {
        addValue(colors, value);
      });
        
      if (colors.length > 1) {
        // console.info("COLORS: ", product.name);
        // console.info(colors);
      }
      */
  }

  /*
  function addValue(arr: Values[], value: Values) {
    if (!arr.includes(value)) {
      arr.push(value);
    }
  }
  */

  const getProductPrice = () => {
    if (isEqual(price, priceUndiscounted)) {
      return (
        <>
          <Box className="big-product-list-priceblock">
            <TaxedMoney taxedMoney={price} />
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box
            className={
              wide
                ? "big-product-list-priceblock-wide"
                : "big-product-list-priceblock"
            }
          >
            <TaxedMoney taxedMoney={price} />
            &nbsp;&nbsp;
            <Box
              component="span"
              className="big-product-list-price-undiscounted"
            >
              <TaxedMoney taxedMoney={priceUndiscounted} />
            </Box>
          </Box>
        </>
      );
    }
  };

  return (
    <Box
      className={wide ? "big-product-list-item-wide" : "big-product-list-item"}
    >
      <Box
        className={
          wide ? "big-product-list-wrapper-wide" : "big-product-list-wrapper"
        }
      >
        <S.AddToWishlist show={true}>
          <AddToWishlist productId={product.id} showButtonText={false} />
        </S.AddToWishlist>

        <Box
          className={
            wide ? "big-product-list-image-wide" : "big-product-list-image"
          }
        >
          <Thumbnail source={product} />
        </Box>
        <Box className="big-product-list-color-flex">
          {getVariantColors().map((color) => (
            <Box
              key={color.id}
              className="big-product-list-color-circle"
              style={{ backgroundColor: color.extra }}
            ></Box>
          ))}
        </Box>
        <Box className="big-product-list-titlegroup">
          <Box>
            <h4 className="big-product-list-title">{product.name}</h4>
            <p className="big-product-list-category">{category?.name}</p>
          </Box>
          <Box>{getProductPrice()}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BigProductListItem;

/* <Box className="big-product-list-pricebar" style={{ display: 'none' }}>{getProductPrice()}</Box> */

// {isEqual(price, priceUndiscounted) ? (''): (<ReactSVG path={saleBadge} className="big-product-list-item__salebadge" />)}

/*

  <SaleBadge disabled={isEqual(price, priceUndiscounted)} type="badge" />

  return (
    <Box className="big-product-list-item">
      <SaleBadge disabled={isEqual(price, priceUndiscounted)} type="badge" />
      <Box className="big-product-list-item__image">
        <Thumbnail source={product} />
      </Box>
      <h4 className="big-product-list-item__title">{product.name}</h4>
      <p className="big-product-list-item__category">{category?.name}</p>
      <p className="big-product-list-item__price">{getProductPrice()}</p>
    </Box>
  );





import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";

import { Thumbnail } from "@components/molecules";
// import saleBadge from "@temp/images/sale_corner_red.svg";
import SaleBadge from "@temp/_nautical/components/SaleBadge/SaleBadge";
// import { ReactSVG } from "react-svg";
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
          <span className="big-product-list-item__undiscounted_price">
            <TaxedMoney taxedMoney={priceUndiscounted} />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TaxedMoney taxedMoney={price} />
        </>
      );
    }
  };
  return (
    <Box className="big-product-list-item">
      <SaleBadge disabled={isEqual(price, priceUndiscounted)} type="corner" />
      <Box className="big-product-list-item__image">
        <Thumbnail source={product} />
      </Box>
      <h4 className="big-product-list-item__title">{product.name}</h4>
      <p className="big-product-list-item__category">{category?.name}</p>
      <p className="big-product-list-item__price">{getProductPrice()}</p>
    </Box>
  );
};

export default ProductListItem;

// {isEqual(price, priceUndiscounted) ? (''): (<ReactSVG path={saleBadge} className="big-product-list-item__salebadge" />)}

*/
