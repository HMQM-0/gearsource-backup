import { Formik } from "formik";
import React from "react";
import { TextField } from "@mui/material";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Purchase order gateway.
 */
const PurchaseOrderGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
}: IProps) => {
  return (
    <Formik
      initialValues={{ status: "not-charged", poNumber: "" }}
      onSubmit={(values, { setSubmitting }) => {
        processPayment(values.status, values.poNumber);
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        values,
        isSubmitting,
        isValid,
        touched,
      }) => (
        <S.Form
          id={formId}
          ref={formRef}
          onSubmit={handleSubmit}
          data-test="purchaseOrderGatewayForm"
        >
          <TextField
            fullWidth
            id="poNumber"
            name="poNumber"
            label="Purchase Order Number"
            value={values.poNumber}
            onChange={handleChange}
            error={touched.poNumber && Boolean(errors.poNumber)}
            helperText={touched.poNumber && errors.poNumber}
          />
          <button
            id="gatewayButton"
            onClick={async (event) => {
              event.preventDefault();
              // @ts-ignore
              handleSubmit(event);
            }}
          />
        </S.Form>
      )}
    </Formik>
  );
};

export { PurchaseOrderGateway };
