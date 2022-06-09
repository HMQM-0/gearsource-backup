// @ts-nocheck
import React from "react";

import { IProps } from "./types";

import { CheckoutShippingLines } from "./CheckoutShippingLines";

import { TypedSellerNameQuery } from "./queries";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShippingMultiSeller: React.FC<IProps> = ({
  selectedShippingMethodIds,
  sellerShippingMethods,
  sellerLineMapping,
  errors,
  onFieldChange,
  values,
}: IProps) => {
  return (
    <section>
      {Object.keys(sellerLineMapping).map((seller, index) => {
        return (
          <TypedSellerNameQuery variables={{ id: seller }} displayLoader>
            {({ data, loading }) =>
              data && !loading ? (
                <>
                  <CheckoutShippingLines
                    shippingMethods={
                      sellerShippingMethods
                        ?.filter((method) => {
                          if (method.seller === +seller) {
                            return true;
                          }
                          return false;
                        })
                        .map((sellerMethods) => {
                          return sellerMethods.value;
                        })[0]
                    }
                    selectedShippingMethodIds={selectedShippingMethodIds}
                    lines={sellerLineMapping[seller]}
                    sellerName={data?.sellerName?.companyName}
                    seller={seller}
                    onFieldChange={onFieldChange}
                    values={values}
                  />
                </>
              ) : null
            }
          </TypedSellerNameQuery>
        );
      })}
    </section>
  );
};

export { CheckoutShippingMultiSeller };
