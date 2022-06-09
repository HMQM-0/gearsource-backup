import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { TaxedMoney } from "@components/containers";
import {
  checkoutMessages,
  translatePaymentStatus,
  translateOrderStatus,
} from "@temp/intl";
// import { OrderDetail_lines } from "@nautical/sdk/lib/fragments/gqlTypes/OrderDetail";
import { OrderDetail_lines } from "@nautical/fragments/gqlTypes/OrderDetail";
import { DropdownMenu, IconButton } from "@components/atoms";

/* import {
  NauticalOrderDetail,
  OrderDetail,
} from "@nautical/sdk/lib/fragments/gqlTypes/OrderDetail"; */
import {
  NauticalOrderDetail,
  OrderDetail,
} from "@nautical/fragments/gqlTypes/OrderDetail";

import { AddressSummary, CartTable, NotFound } from "../../../components";
import { ILine } from "../../../components/CartTable/ProductRow";

import { orderHistoryUrl } from "../../../app/routes";

const extractOrderLines = (lines: OrderDetail_lines[]): ILine[] => {
  return lines
    .map((line) => ({
      quantity: line.quantity,
      totalPrice: line.totalPrice,
      ...line.variant,
      name: line.productName,
    }))
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};

const Page: React.FC<{
  guest: boolean;
  order: OrderDetail | NauticalOrderDetail;
  downloadInvoice: () => void;
}> = ({ guest, order, downloadInvoice }) => {
  const intl = useIntl();
  return order ? (
    <>
      {!guest && (
        <Link
          className="order-details__link"
          to={
            orderHistoryUrl
          }
        >
          <FormattedMessage defaultMessage="Go back to Order History" />
        </Link>
      )}
      <Box className="order-details__header">
        <Box>
          <h3>
            <FormattedMessage
              defaultMessage="Order Number: {orderNum}"
              values={{ orderNum: order.number }}
            />
          </h3>
          <p className="order-details__status">
            {translatePaymentStatus(order.paymentStatusDisplay, intl)} /{" "}
            {translateOrderStatus(order.statusDisplay, intl)}
          </p>
        </Box>
        {order &&
          "invoices" in order &&
          order.invoices?.filter((invoice) => {
            return invoice.number.includes("INV");
          }).length > 0 && (
            <Box className="order-details__header-menu">
              <DropdownMenu
                type="clickable"
                header={
                  <IconButton
                    testingContext="expandButton"
                    name="expand"
                    size={28}
                  />
                }
                items={[
                  {
                    onClick: downloadInvoice,
                    content: (
                      <span>
                        <FormattedMessage
                          defaultMessage="Download invoice"
                          description="action in popup menu in order view"
                        />
                      </span>
                    ),
                  },
                ]}
              />
            </Box>
          )}
      </Box>
      <CartTable
        lines={extractOrderLines(order.lines)}
        totalCost={<TaxedMoney taxedMoney={order.total} />}
        deliveryCost={<TaxedMoney taxedMoney={order.shippingPrice} />}
        subtotal={<TaxedMoney taxedMoney={order.subtotal} />}
        volumeDiscount={
          <TaxedMoney
            taxedMoney={(order as NauticalOrderDetail).volumeDiscount}
          />
        }
        discount={
          <TaxedMoney
            taxedMoney={{
              gross: order.discount,
              net: order.discount,
            }}
          />
        }
        discountName={order.discountName}
        taxes={
          <TaxedMoney
            taxedMoney={{
              gross: {
                amount: order.total.gross.amount - order.total.net.amount,
                currency: order.total.gross.currency,
              },
              net: {
                amount: order.total.gross.amount - order.total.net.amount,
                currency: order.total.gross.currency,
              },
            }}
          />
        }
      />
      <Box className="order-details__summary">
        <Box>
          <h4>
            <FormattedMessage {...checkoutMessages.shippingAddress} />
          </h4>
          <AddressSummary
            address={order.shippingAddress}
            email={order.userEmail}
            // @ts-ignore
            paragraphRef={this.shippingAddressRef}
          />
        </Box>
      </Box>
    </>
  ) : (
    <NotFound />
  );
};
export default Page;
