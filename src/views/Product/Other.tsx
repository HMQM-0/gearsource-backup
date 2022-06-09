import * as React from "react";
import { FormattedMessage } from "react-intl";

import { ProductList } from "@components/organisms";
import { Box } from "@mui/material";
import { ProductDetails_product_category_products_edges } from "./gqlTypes/ProductDetails";

const OtherProducts: React.FC<{
  products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => (
  <Box className="product-page__other-products">
    <Box className="container">
      <h4 className="product-page__other-products__title">
        <FormattedMessage defaultMessage="Other products in this category" />
      </h4>
      <ProductList products={products.map(({ node }) => node)} />
    </Box>
  </Box>
);

export default OtherProducts;
