import React from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { IFormError } from "../types";
import * as S from "./styles";
// import { StripeInputElement } from '@components/atoms';

interface IStripeCreditCardFormProps {
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Method called when the form is submitted. Passed token attribute will be used to create payment.
   */
  errors?: IFormError[];
  /**
   * Called when values provided in Stripe elements are submitted.
   */
  onSubmit: (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => Promise<void>;
}

const StripeCreditCardForm: React.FC<IStripeCreditCardFormProps> = (props) => {
  const {
    formRef,
    formId,
    // @ts-ignore
    errors = [],
    onSubmit,
  } = props;
  const stripe = useStripe();
  const elements = useElements();

  return (
    <S.Form id={formId} ref={formRef}>
      {/*
          <S.Card data-test="stripeForm">
            <S.CardNumberField>
              <StripeInputElement
                type="CardNumber"
                label="Card number"
                // onChange={(event) => {
                //   handleChange(event);
                //   setStripeErrors([]);
                // }}
              />
            </S.CardNumberField>
            <S.CardExpiryField>
              <StripeInputElement
                type="CardExpiry"
                label="Expiration date"
                // onChange={(event) => {
                //   handleChange(event);
                //   setStripeErrors([]);
                // }}
              />
            </S.CardExpiryField>
            <S.CardCvcField>
              <StripeInputElement
                type="CardCvc"
                label="CVC"
                // onChange={(event) => {
                //   handleChange(event);
                //   setStripeErrors([]);
                // }}
              />
            </S.CardCvcField>
          </S.Card>
          */}
      {/* <div onClick={event => {
            event.preventDefault();
            console.info("ON CLICK")
            console.info(formRef)
            formRef?.current!.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            )
          }}>
            TEST
          </div> */}
      <button
        id="gatewayButton"
        onClick={async (event) => {
          event.preventDefault();
          // console.info(event);
          await onSubmit(stripe, elements);
        }}
      />
      {/* <ErrorMessage errors={allErrors} /> */}
    </S.Form>
  );
};

export default StripeCreditCardForm;
