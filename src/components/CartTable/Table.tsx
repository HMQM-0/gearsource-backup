import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";
import { commonMessages } from "@temp/intl";

import CostRow from "./CostRow";
import ProductRow, { EditableProductRowProps, ILine } from "./ProductRow";

import { smallScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

interface TableProps extends EditableProductRowProps {
  lines: ILine[];
  subtotal: React.ReactNode;
  deliveryCost?: React.ReactNode;
  totalCost?: React.ReactNode;
  discount?: React.ReactNode;
  discountName?: string;
  volumeDiscount?: React.ReactNode;
  taxes?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({
  subtotal,
  deliveryCost,
  totalCost,
  discount,
  discountName,
  volumeDiscount,
  lines,
  taxes,
  ...rowProps
}) => {
  const intl = useIntl();
  return (
    <Media query={{ minWidth: smallScreen }}>
      {(mediumScreen) => (
        <table className="cart-table">
          <thead>
            <tr>
              <th>
                <FormattedMessage {...commonMessages.products} />
              </th>
              {mediumScreen && (
                <th>
                  <FormattedMessage {...commonMessages.price} />
                </th>
              )}
              <th>
                <FormattedMessage {...commonMessages.variant} />
              </th>
              <th className="cart-table__quantity-header">
                <FormattedMessage {...commonMessages.qty} />
              </th>
              <th colSpan={2}>
                {mediumScreen ? (
                  <FormattedMessage {...commonMessages.totalPrice} />
                ) : (
                  <FormattedMessage {...commonMessages.price} />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <ProductRow
                key={line?.id}
                line={line}
                mediumScreen={mediumScreen}
                {...rowProps}
              />
            ))}
          </tbody>
          <tfoot>
            <CostRow
              mediumScreen={mediumScreen}
              heading={intl.formatMessage(commonMessages.subtotal)}
              cost={subtotal}
            />
            {taxes && (
              <CostRow
                mediumScreen={mediumScreen}
                heading={intl.formatMessage({
                  defaultMessage: "Taxes",
                })}
                cost={taxes}
              />
            )}
            {discount && (
              <CostRow
                mediumScreen={mediumScreen}
                heading={
                  discountName
                    ? intl.formatMessage(
                        { defaultMessage: "Discount: {discountName}" },
                        { discountName }
                      )
                    : "Promo Code Discount"
                }
                cost={discount}
              />
            )}
            {volumeDiscount && (
              <CostRow
                mediumScreen={mediumScreen}
                heading={intl.formatMessage({
                  defaultMessage: "Volume Discount",
                })}
                cost={volumeDiscount}
              />
            )}
            {deliveryCost && (
              <CostRow
                mediumScreen={mediumScreen}
                heading={intl.formatMessage({
                  defaultMessage: "Delivery Cost",
                })}
                cost={deliveryCost}
              />
            )}
            {totalCost && (
              <CostRow
                mediumScreen={mediumScreen}
                heading={intl.formatMessage({ defaultMessage: "Total Cost" })}
                cost={totalCost}
              />
            )}
          </tfoot>
        </table>
      )}
    </Media>
  );
};

export default Table;
