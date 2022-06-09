import React from "react";

import { FormattedMessage } from "react-intl";
import { Button } from "@mui/material";

import { Container } from "@components/templates";
import { checkoutMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Thank you page after completing the checkout.
 */
const ThankYou: React.FC<IProps> = ({
  orderEmail,
  orderNumber,
  continueShopping,
  orderDetails,
}: IProps) => {
  return (
    <Container data-test="thankYouView">
      <S.Wrapper>
        <S.ThankYouHeader>
          <FormattedMessage defaultMessage="Thank you" />
          <br />
          <span>
            <FormattedMessage defaultMessage="for your order!" />
          </span>
        </S.ThankYouHeader>
        <S.Paragraph>
          <FormattedMessage defaultMessage="Your order number is" />{" "}
          <span>{orderNumber}</span>
          <FormattedMessage defaultMessage="." />
        </S.Paragraph>
        {orderEmail ? (
          <S.Paragraph>
            <FormattedMessage defaultMessage="We’ve emailed your order confirmation to" />{" "}
            <span>{orderEmail}</span>
            <FormattedMessage defaultMessage=". We’ll notify you when your order has shipped." />
          </S.Paragraph>
        ) : (
          <S.Paragraph>
            <FormattedMessage defaultMessage="We have emailed your order confirmation, and we will notify you when the order has shipped." />
          </S.Paragraph>
        )}
        <S.Buttons>
          <Button
            // testingContext="continueShoppingButton"
            variant="contained"
            onClick={continueShopping}
            color="secondary"
            fullWidth
          >
            <FormattedMessage {...checkoutMessages.continueShopping} />
          </Button>
          <Button
            // testingContext="gotoOrderDetailsButton"
            onClick={orderDetails}
            variant="contained"
            fullWidth
          >
            <FormattedMessage defaultMessage="ORDER DETAILS" />
          </Button>
        </S.Buttons>
      </S.Wrapper>
    </Container>
  );
};

export { ThankYou };
