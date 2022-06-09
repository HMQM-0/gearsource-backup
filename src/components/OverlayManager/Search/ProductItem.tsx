import * as React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../../core/utils";
import { SearchResults_products_edges } from "./gqlTypes/SearchResults";

const ProductItem: React.FC<SearchResults_products_edges> = ({
  node: product,
}) => (
  <li className="search__products__item">
    <Link to={generateProductUrl(product)}>
      <Thumbnail source={product} />
      <Box component="span">
        <h4>{product.name}</h4>
        <p>{product.category?.name || "-"}</p>
      </Box>
    </Link>
  </li>
);

export default ProductItem;
