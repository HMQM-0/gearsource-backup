import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Icon } from "@components/atoms";
import { Money, TaxedMoney } from "@components/containers";
import { CartSummaryRow } from "@components/molecules";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { ICostLine, ICosts, IProps } from "./types";

import { ITaxedMoney } from "@temp/@next/types";

const CostLine = ({
  name,
  cost,
  volumeDiscount,
  last = false,
  negative = false,
}: ICostLine) =>
  cost ? (
    <S.CostLine last={last}>
      <span>{name}</span>
      <span data-test={`cartSummaryCost${name.replace(/\s/g, "")}`}>
        {negative && "- "}
        <TaxedMoney taxedMoney={cost} />
      </span>
    </S.CostLine>
  ) : (
    <S.CostLine last={last}>
      <span>{name}</span>
      <span data-test={`cartSummaryCost${name.replace(/\s/g, "")}`}>
        {negative && "- "}
        <Money money={volumeDiscount} />
      </span>
    </S.CostLine>
  );

function calculateTax(value: ITaxedMoney | null | undefined) {
  let taxes: ITaxedMoney = {
    gross: {
      amount: 0,
      currency: "USD",
    },
    net: {
      amount: 0,
      currency: "USD",
    },
  };
  if (value === null || value === undefined) {
    return taxes;
  } else {
    taxes = {
      gross: {
        amount: value.gross.amount - value.net.amount,
        currency: value.gross.currency,
      },
      net: {
        amount: value.gross.amount - value.net.amount,
        currency: value.net.currency,
      },
    };
    return taxes;
  }
}

const Costs = ({
  subtotal,
  promoCode,
  shipping,
  total,
  volumeDiscount,
}: ICosts) => {
  const intl = useIntl();
  return (
    <S.Costs>
      {subtotal && (
        <CostLine
          name={intl.formatMessage(commonMessages.subtotal)}
          cost={subtotal}
        />
      )}
      {shipping && (
        <CostLine
          name={intl.formatMessage(commonMessages.shipping)}
          cost={shipping}
        />
      )}
      {promoCode && promoCode.gross.amount > 0 && (
        <CostLine
          name={intl.formatMessage(commonMessages.promoCode)}
          cost={promoCode}
          negative
        />
      )}
      {volumeDiscount && volumeDiscount.amount > 0 && (
        <CostLine
          name={intl.formatMessage({
            defaultMessage: "Volume Discount",
            description: "volume discount",
          })}
          volumeDiscount={volumeDiscount}
          negative
        />
      )}
      {total && (
        <CostLine
          name={intl.formatMessage({
            defaultMessage: "Taxes",
            description: "taxes",
          })}
          cost={calculateTax(total)}
        />
      )}
      {total && (
        <CostLine
          name={intl.formatMessage(commonMessages.total)}
          cost={total}
          last
        />
      )}
    </S.Costs>
  );
};

/**
 * Cart summary displayed in checkout page
 */
const CartSummary: React.FC<IProps> = ({
  subtotal,
  total,
  shipping,
  promoCode,
  products,
  volumeDiscount,
}: IProps) => {
  const [mobileCartOpened, setMobileCartOpened] = useState(false);

  return (
    <S.Wrapper mobileCartOpened={mobileCartOpened}>
      <S.Title
        data-test="cartSummaryTitle"
        onClick={() => setMobileCartOpened(!mobileCartOpened)}
      >
        <FormattedMessage defaultMessage="Cart Summary" />
        <S.ArrowUp mobileCartOpened={mobileCartOpened}>
          <Icon name="arrow_up" size={24} />
        </S.ArrowUp>
      </S.Title>
      <S.Content>
        <S.HR />
        <S.CartSummaryProductList>
          {products?.map((product, index) => (
            <div key={product.sku}>
              <S.ProductLine>
                <CartSummaryRow
                  index={index}
                  sku={product.sku}
                  quantity={product.quantity}
                  name={product.name}
                  price={product.price}
                  thumbnail={product.thumbnail}
                />
              </S.ProductLine>
              <S.HR />
            </div>
          ))}
        </S.CartSummaryProductList>
        <Costs
          subtotal={subtotal}
          total={total}
          shipping={shipping}
          promoCode={promoCode}
          volumeDiscount={volumeDiscount}
        />
      </S.Content>
    </S.Wrapper>
  );
};

export { CartSummary };
