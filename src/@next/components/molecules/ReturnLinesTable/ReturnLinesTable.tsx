import React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";
import * as S from "./styles";
import { Typography } from "@mui/material";
import { ReturnLineItem } from "./ReturnLineItem";
import { Button } from "@mui/material";
import { commonMessages } from "@temp/intl";
// import {
//   generateMicrositeUrl,
//   getMicrositeId,
//   getMicrositeSlug,
//   isMicrosite,
// } from "@temp/core/utils";
import { BASE_URL } from "@temp/core/config";
import { augmentLine } from "./utils";
import { Line } from "./types/Line";
import { ReturnFulfillment } from "./types/ReturnFulfillment";
import { OrderLine } from "./types/OrderLine";
import { useNavigate, useLocation } from "react-router";

export const ReturnLinesTable = ({ order }: { order: any }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // CONTEXT
  const theme = React.useContext(ThemeContext);

  // HELPER FUNCTIONS
  const getReturnLines = (
    returnFulfillments: ReturnFulfillment[],
    orderLines: OrderLine[]
  ) => {
    const lines: any[] = [];
    returnFulfillments.forEach((returnFulfillment) => {
      returnFulfillment.lines.forEach((line) => {
        const augmentedLine = augmentLine(line, orderLines);
        lines.push(augmentedLine);
      });
    });
    return lines;
  };

  // EVENT HANDLERS
  const handleBackToHomepageClick = () => {
    navigate(
      // !!isMicrosite()
      //   ? generateMicrositeUrl(getMicrositeId(), getMicrositeSlug())
      BASE_URL
    );
  };

  // VARIABLES
  const returnLines = getReturnLines(
    (location.state as any).returns?.fulfillments,
    order.lines
  );

  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {() => {
          return (
            <>
              <Typography
                variant="subtitle1"
                style={{ color: theme.colors.lightFont, marginTop: "0.5rem" }}
              >
                Order Number {order?.number}
              </Typography>
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", marginTop: "0.25rem" }}
              >
                Return Request Confirmation
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ color: theme.colors.lightFont, marginTop: "0.5rem" }}
              >
                Your return request has been made for the following
                product&#40;s&#41;. Please check your email for further
                instructions.
              </Typography>
              {/* HEADER ROW */}
              <S.HeaderRow>
                <S.ProductImage />
                <S.ProductName />
                <S.QuantityReturned>
                  <FormattedMessage defaultMessage="Return Quantity" />
                </S.QuantityReturned>
                <S.ItemPrice>
                  <FormattedMessage defaultMessage="Item Price" />
                </S.ItemPrice>
                <S.ReturnReason>
                  <FormattedMessage defaultMessage="Return Reason" />
                </S.ReturnReason>
              </S.HeaderRow>
              {/* ROWS */}
              {returnLines.map((line: Line) => {
                return <ReturnLineItem key={line.id} line={line} />;
              })}
              <S.Button>
                <Button
                  type="submit"
                  size="small"
                  style={{
                    height: "30px",
                    borderRadius: "5px",
                    boxShadow: "1px 1px 5px #888888",
                  }}
                  onClick={handleBackToHomepageClick}
                >
                  <FormattedMessage {...commonMessages.homepage} />
                </Button>
              </S.Button>
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
