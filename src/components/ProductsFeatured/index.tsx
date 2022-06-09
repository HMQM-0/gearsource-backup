import { useAuth } from "@nautical/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Carousel, ProductListItem } from "..";
import { generateProductUrl, maybe } from "../../core/utils";
import { ShopContext } from "../ShopProvider/context";
import { TypedFeaturedProductsQuery } from "./queries";

import "./scss/index.scss";
import { FormattedMessage } from "react-intl";

interface ProductsFeaturedProps {
  caption?: string;
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({
  caption,
  title,
}) => {
  const { loginForProducts } = React.useContext(ShopContext);
  const { user } = useAuth();

  if (!user && loginForProducts) {
    return null;
  }

  return (
    <TypedFeaturedProductsQuery displayError={false}>
      {({ data }) => {
        const products = maybe(
          () => data.shop.homepageCollection.products.edges,
          []
        );

        if (products.length) {
          return (
            <Box className="products-featured">
              <Box className="container">
                <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
                  <FormattedMessage defaultMessage="Featured Products" />
                </Typography>
                {caption ? <Box className="caption">{caption}</Box> : null}
                <Carousel>
                  {products.map(({ node: product }) => (
                    <Link
                      to={generateProductUrl(product)}
                      key={product.id}
                    >
                      <ProductListItem
                        product={product}
                        loginForPrice={!user && data?.shop?.loginForPrice}
                      />
                    </Link>
                  ))}
                </Carousel>
              </Box>
            </Box>
          );
        }
        return null;
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Featured",
};

export default ProductsFeatured;
