import React from "react";
import { FormattedMessage, FormattedDate, useIntl } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";
import { Box, Button } from "@mui/material";
import { TaxedMoney } from "@components/containers";
import { commonMessages, translateOrderStatus } from "@temp/intl";

import { Thumbnail } from "..";
import {
  // generateMicrositeProductUrl,
  // generateMicrositeUrl,
  generateProductUrl,
  // getMicrositeId,
  // getMicrositeSlug,
  // isMicrosite,
} from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";
import { useNavigate } from "react-router";
import { getMaxQuantityReturnable } from "../utils";

const header = (matches: boolean, hasReturnableOrder?: boolean) => (
  <S.HeaderRow>
    <S.IndexNumber>
      <FormattedMessage defaultMessage="Order Number" />
    </S.IndexNumber>
    {matches && (
      <>
        <S.ProductsOrdered>
          <FormattedMessage defaultMessage="Products Ordered" />
        </S.ProductsOrdered>
        <S.DateOfOrder>
          <FormattedMessage defaultMessage="Order Placed" />
        </S.DateOfOrder>
        <S.Value>
          <FormattedMessage defaultMessage="Total" />
        </S.Value>
      </>
    )}
    <S.Status>
      <FormattedMessage {...commonMessages.status} />
    </S.Status>
    {hasReturnableOrder && <S.ReturnColumn />}
  </S.HeaderRow>
);

const getHasFulfilledOrPartiallyFulfilledOrder = (orders: any[]) => {
  return (
    orders.filter(
      (order) =>
        order.node.statusDisplay === "fulfilled" ||
        order.node.statusDisplay === "partially fulfilled"
    ).length > 0
  );
};

export const OrderTabel: React.FC<IProps> = ({ orders }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const intl = useIntl();
  const hasFulfilledOrPartiallyFulfilledOrder =
    orders && getHasFulfilledOrPartiallyFulfilledOrder(orders);

  const navigate = useNavigate();

  // HELPER FUNCTIONS
  const checkIfAllFulfilledItemsReturned = (
    lines: any,
    sellerFulfillments: any
  ) => {
    let allFulfilledItemsReturned = true;
    for (const line of lines) {
      const maxQuantityReturnable = getMaxQuantityReturnable(
        line,
        sellerFulfillments
      );
      if (maxQuantityReturnable > 0) {
        allFulfilledItemsReturned = false;
        break;
      }
    }
    return allFulfilledItemsReturned;
  };

  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {(matches: boolean) => {
          return (
            <>
              <S.Row>
                {header(matches, hasFulfilledOrPartiallyFulfilledOrder)}
              </S.Row>
              {orders &&
                orders.map((order) => {
                  const allFulfilledItemsReturned =
                    checkIfAllFulfilledItemsReturned(
                      order.node.lines,
                      order.node.sellerFulfillments
                    );
                  const formattedFulfillmentStatus = translateOrderStatus(
                    order.node.statusDisplay,
                    intl
                  ).toLowerCase();
                  const orderFulfilledOrPartiallyFulfilled =
                    formattedFulfillmentStatus === "fulfilled" ||
                    formattedFulfillmentStatus === "partially fulfilled";
                  const date = new Date(order.node.created);
                  return (
                    <S.Row
                      data-test="orderEntry"
                      data-test-id={order.node.number}
                      key={order.node.number}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        navigate(
                          // !!isMicrosite()
                          //   ? `${generateMicrositeUrl(
                          //       getMicrositeId(),
                          //       getMicrositeSlug()
                          //     )}order-history/${order.node.token}`
                          //   : `/order-history/${order.node.token}`
                          `/order-history/${order.node.token}`
                        );
                      }}
                    >
                      <S.IndexNumber>{order.node.number}</S.IndexNumber>
                      {matches ? (
                        <>
                          <S.ProductsOrdered>
                            {order.node.lines
                              .slice(0, 5)
                              .map((product: any) => (
                                <Box
                                  component="span"
                                  key={product?.variant?.product?.id}
                                  // @ts-ignore
                                  onClick={(evt) => {
                                    evt.stopPropagation();
                                    navigate(
                                      generateProductUrl(
                                        product.variant.product
                                      )
                                    );
                                  }}
                                >
                                  <Thumbnail source={product} />
                                </Box>
                              ))}
                          </S.ProductsOrdered>
                          <S.DateOfOrder>
                            <FormattedDate value={date} />
                          </S.DateOfOrder>
                          <S.Value>
                            <TaxedMoney taxedMoney={order.node.total} />
                          </S.Value>
                        </>
                      ) : (
                        ""
                      )}
                      <S.Status>
                        {translateOrderStatus(order.node.statusDisplay, intl)}
                      </S.Status>
                      {hasFulfilledOrPartiallyFulfilledOrder && (
                        <S.ReturnColumn>
                          {orderFulfilledOrPartiallyFulfilled &&
                          !allFulfilledItemsReturned ? (
                            <Button
                              type="submit"
                              size="small"
                              style={{
                                height: "30px",
                                borderRadius: "5px",
                                boxShadow: "1px 1px 5px #888888",
                              }}
                              onClick={(evt) => {
                                evt.stopPropagation();
                                navigate(
                                  // !!isMicrosite()
                                  //   ? `${generateMicrositeUrl(
                                  //     getMicrositeId(),
                                  //     getMicrositeSlug()
                                  //   )}/order-return-request/${order.node.token}`
                                  `/order-return-request/${order.node.token}`
                                );
                              }}
                            >
                              <FormattedMessage {...commonMessages.return} />
                            </Button>
                          ) : (
                            orderFulfilledOrPartiallyFulfilled &&
                            allFulfilledItemsReturned && (
                              <div>No returnable items remain</div>
                            )
                          )}
                        </S.ReturnColumn>
                      )}
                    </S.Row>
                  );
                })}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
