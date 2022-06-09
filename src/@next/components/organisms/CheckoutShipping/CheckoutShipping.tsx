// @ts-nocheck
import { Formik } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ErrorMessage } from "@components/atoms";
import { checkoutMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

import { CheckoutShippingMultiSeller } from "./CheckoutShippingMultiSeller";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShipping: React.FC<IProps> = ({
  sellerShippingMethods, //
  selectedShippingMethodIds, // passing in 0
  selectSellerShippingMethods, // dummy method
  sellerLineMapping, // sending empty right
  errors,
  setErrors,
  formId,
  formRef,
}: IProps) => {
  let initialValues = {};
  const parsedInitialMethods = JSON.parse(selectedShippingMethodIds);

  sellerShippingMethods?.forEach(
    (data) =>
      (initialValues[data.seller] =
        parsedInitialMethods.find((sellerAndMethod) => {
          return +sellerAndMethod.seller === data.seller;
        })?.shippingMethod?.id || [])
  );

  return (
    <section>
      <S.Title data-test="checkoutPageSubtitle">
        <FormattedMessage {...checkoutMessages.shippingMethod} />
      </S.Title>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          if (!Object.values(values).some((value) => !value.length)) {
            if (selectSellerShippingMethods && values) {
              for (const method in values) {
                selectSellerShippingMethods(method, values[method]);
              }
            }
          } else {
            setErrors([
              ...errors,
              { message: "Must have a shipping method for each fulfiller" },
            ]);
          }
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <S.ShippingMethodForm
              id={formId}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <CheckoutShippingMultiSeller
                selectedShippingMethodIds={selectedShippingMethodIds}
                sellerShippingMethods={sellerShippingMethods}
                sellerLineMapping={sellerLineMapping}
                errors={errors}
                onFieldChange={setFieldValue}
                values={values}
              />
              <ErrorMessage errors={errors} />
            </S.ShippingMethodForm>
          );
        }}
      </Formik>
    </section>
  );
};

export { CheckoutShipping };
