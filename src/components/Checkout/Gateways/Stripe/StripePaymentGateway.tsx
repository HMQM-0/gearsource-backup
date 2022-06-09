import { CardNumberElement, Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import React, { useMemo, useState } from "react";

import { ICardData, IFormError, IPaymentGatewayConfig } from "../types";
import StripeCreditCardForm from "./StripeCreditCardForm";

export interface IStripePaymentGatewayProps {
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Errors returned by the payment gateway.
   */
  errors?: IFormError[];
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: (token: string, cardData: ICardData) => void;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
}

/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IStripePaymentGatewayProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  onError,
}: IStripePaymentGatewayProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  const stripePromise = useMemo(() => {
    if (apiKey) {
      return loadStripe(apiKey);
    }
    const stripeApiKeyErrors = [
      {
        message: "Stripe gateway misconfigured. Api key not provided.",
      },
    ];
    setSubmitErrors(stripeApiKeyErrors);
    onError(stripeApiKeyErrors);
    return null;
  }, [apiKey]);

  const handleFormSubmit = async (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => {
    // console.info("HANDLE FORM SUBMIT");
    const cartNumberElement = elements?.getElement(CardNumberElement);

    // console.info("CART ELEMENT");
    // console.info(cartNumberElement);

    if (cartNumberElement) {
      const payload = await stripe?.createPaymentMethod({
        card: cartNumberElement,
        type: "card",
      });
      if (payload?.error) {
        // console.info("SUBMIT ERRORS 1");
        const errors = [
          {
            ...payload.error,
            // message: payload.error.message || "",
            message: payload.error.message?.includes("Invalid API Key")
              ? "Invalid API Key provided"
              : payload.error.message || "",
          },
        ];
        setSubmitErrors(errors);
        onError(errors);
      } else if (payload?.paymentMethod) {
        // console.info("GOT PAYMENT METHOD");
        const { card, id } = payload.paymentMethod;
        if (card?.brand && card?.last4) {
          processPayment(id, {
            brand: card?.brand,
            expMonth: card?.exp_month || null,
            expYear: card?.exp_year || null,
            firstDigits: null,
            lastDigits: card?.last4,
          });
        }
      } else {
        const stripePayloadErrors = [
          {
            message:
              "Payment submission error. Stripe gateway returned no payment method in payload.",
          },
        ];
        setSubmitErrors(stripePayloadErrors);
        onError(stripePayloadErrors);
      }
    } else {
      const stripeElementsErrors = [
        {
          message:
            "Stripe gateway improperly rendered. Stripe elements were not provided.",
        },
      ];
      setSubmitErrors(stripeElementsErrors);
      onError(stripeElementsErrors);
    }
  };

  const allErrors = [...errors, ...submitErrors];

  return (
    <div data-test="stripeGateway">
      <Elements stripe={stripePromise}>
        <StripeCreditCardForm
          formId={formId}
          formRef={formRef}
          errors={allErrors}
          onSubmit={handleFormSubmit}
        />
      </Elements>
    </div>
  );
};

export { StripePaymentGateway };
