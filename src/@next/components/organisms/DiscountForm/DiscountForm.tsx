import { Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Box, Button, Chip } from "@mui/material";
import { ErrorMessage, Input } from "@components/atoms";
import { commonMessages } from "@temp/intl";
import * as S from "./styles";
import { IProps } from "./types";
import { useCheckout } from "@temp/@nautical/react";

export const DiscountForm: React.FC<IProps> = ({
  handleSubmit,
  discount,
  errors,
  setErrors,
  formId,
  formRef,
}: IProps) => {
  const promoCode = discount && discount.promoCode;

  const [inputCode, setInputCode] = React.useState("");
  const [tempPromoCode, setTempPromoCode] = React.useState(promoCode);
  const intl = useIntl();

  const { addPromoCode, removePromoCode } = useCheckout();

  const handleApplyBtnClick = async (newInputCode: string) => {
    const { dataError } = await addPromoCode(newInputCode);
    if (dataError?.error) {
      setErrors(dataError?.error);
    } else {
      setErrors([]);
      setTempPromoCode(newInputCode);
      setInputCode("");
    }
  };

  const handleRemoveBtnClick = async (newInputCode: string) => {
    const { dataError } = await removePromoCode(tempPromoCode);
    if (dataError?.error) {
      setErrors(dataError?.error);
    } else {
      setTempPromoCode("");
      setInputCode(newInputCode);
    }
  };

  return (
    <Formik
      initialValues={{
        errors,
        inputCode,
        tempPromoCode,
      }}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        if (handleSubmit) {
          handleSubmit({
            promoCode: values.tempPromoCode,
          });
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
        const hasErrors = !!(values.errors && values.errors.length);

        return (
          <S.DiscountForm
            id={formId}
            ref={formRef}
            onSubmit={handleSubmit}
            data-test="discountForm"
          >
            <S.Input>
              <S.InputWithButton>
                <S.InputWrapper>
                  <Input
                    error={hasErrors}
                    name="inputCode"
                    value={values.inputCode}
                    label={intl.formatMessage(commonMessages.promoCode)}
                    onChange={handleChange}
                  />
                </S.InputWrapper>
                <S.ButtonWrapper>
                  <Button
                    type="button"
                    // testingContext="applyPromoCodeButton"
                    onClick={() => handleApplyBtnClick(values.inputCode)}
                  >
                    <FormattedMessage defaultMessage="Apply" />
                  </Button>
                </S.ButtonWrapper>
              </S.InputWithButton>
              <ErrorMessage errors={values.errors} />
            </S.Input>
            {values.tempPromoCode && (
              <>
                <Box component="span">
                  <FormattedMessage {...commonMessages.promoCode} />:
                </Box>
                <S.ChipsWrapper>
                  <Chip
                    label={values.tempPromoCode}
                    onDelete={() => handleRemoveBtnClick(values.inputCode)}
                  />
                </S.ChipsWrapper>
              </>
            )}
          </S.DiscountForm>
        );
      }}
    </Formik>
  );
};
