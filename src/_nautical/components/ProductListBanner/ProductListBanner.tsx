import * as React from "react";
import { Box } from "@mui/material";
interface ProductListBannerProps {
  disable: boolean;
  image: string;
}

const ProductListBanner: React.FC<ProductListBannerProps> = (props) => {
  const { disable, image } = props;

  return (
    <>
      {disable ? null : (
        <Box>
          <img src={image} width="100%" />
        </Box>
      )}
    </>
  );
};

export default ProductListBanner;
