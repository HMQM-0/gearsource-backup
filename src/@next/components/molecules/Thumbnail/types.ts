/* import {
  ProductDetails_product_thumbnail,
  ProductDetails_product_thumbnail2x,
} from "@nautical/sdk/lib/queries/gqlTypes/ProductDetails"; */
import {
  ProductDetails_product_thumbnail,
  ProductDetails_product_thumbnail2x,
} from "@nautical/queries/gqlTypes/ProductDetails";

interface ISource {
  thumbnail?: ProductDetails_product_thumbnail | null;
  thumbnail2x?: ProductDetails_product_thumbnail2x | null;
}

export interface IProps {
  source: ISource;
  noPhotoDefault?: boolean;
  children?: any;
  style?: React.CSSProperties;
  height?: string;
  width?: string;
}
