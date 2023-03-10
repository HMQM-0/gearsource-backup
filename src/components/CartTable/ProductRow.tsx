import classNames from "clsx";
import * as React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
// import { ProductVariant } from "@nautical/sdk/lib/fragments/gqlTypes/ProductVariant";
import { ProductVariant } from "@nautical/fragments/gqlTypes/ProductVariant";
// import { OrderByToken_orderByToken_lines_unitPrice } from "@nautical/sdk/lib/queries/gqlTypes/OrderByToken";
import { OrderByToken_orderByToken_lines_unitPrice } from "@nautical/queries/gqlTypes/OrderByToken";

import {
  // generateMicrositeProductUrl,
  generateProductUrl,
  // getMicrositeId,
  // getMicrositeSlug,
  // isMicrosite,
} from "../../core/utils";

export type ILine = Omit<
  ProductVariant,
  "__typename" | "sku" | "quantityAvailable" | "isAvailable"
> & {
  quantity: number;
  totalPrice: OrderByToken_orderByToken_lines_unitPrice;
  quantityAvailable?: number;
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: ILine;
}

export interface EditableProductRowProps {
  processing?: boolean;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  mediumScreen,
  processing,
  line,
}) => {
  const productUrl = generateProductUrl(line.product);

  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing,
      })}
    >
      <td className="cart-table__thumbnail">
        <Box>
          {mediumScreen && (
            <Link to={productUrl}>
              <Thumbnail source={line.product} />
            </Link>
          )}
          <Link to={productUrl}>{line.product.name}</Link>
        </Box>
      </td>

      {mediumScreen && (
        <td>
          <TaxedMoney taxedMoney={line.pricing.price} />
        </td>
      )}

      <td>
        {line.attributes.map(({ attribute, values }, attributeIndex) => (
          <p key={attribute.id}>
            {attribute.name}: {values.map((value) => value.name).join(", ")}
          </p>
        ))}
      </td>

      <td className="cart-table__quantity-cell">
        <p>{line.quantity}</p>
      </td>

      <td colSpan={2}>
        <TaxedMoney taxedMoney={line.totalPrice} />
      </td>
    </tr>
  );
};

export default ProductRow;
