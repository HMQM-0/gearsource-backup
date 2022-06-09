import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import React, { useMemo, useState } from "react";
import { IFormError } from "@types";
import { StripeCreditCardForm } from "../StripeCreditCardForm";

import { IProps } from "./types";
import { useQuery } from "@apollo/client";
import { getClientSecretQuery } from "@temp/app/queries";
import { useCheckout } from "@nautical/react";
import Loader from "@temp/components/Loader";

// import { useLocation } from "react-router";

/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  total,
  errors = [],
  onError,
}: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);
  const [clientSecret, setClientSecret] = useState("");
  const { checkout } = useCheckout();
  // const location = useLocation();
  // console.info("LOCATION")
  // console.info(location)
  // console.info(window.location.href)

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

  useQuery(getClientSecretQuery, {
    fetchPolicy: "network-only",
    variables: {
      gateway: "nautical.payments.stripe",
      paymentInformation: {
        amount: total?.gross?.amount,
        currency: total?.gross?.currency?.toLowerCase(),
        token: localStorage.getItem("nauticalPaymentId"),
        shipping: {
          firstName: checkout?.shippingAddress?.firstName,
          lastName: checkout?.shippingAddress?.lastName,
          companyName: checkout?.shippingAddress?.companyName,
          streetAddress1: checkout?.shippingAddress?.streetAddress1,
          streetAddress2: checkout?.shippingAddress?.streetAddress2,
          city: checkout?.shippingAddress?.city,
          countryArea: checkout?.shippingAddress?.countryArea,
          postalCode: checkout?.shippingAddress?.postalCode,
          country: checkout?.shippingAddress?.country?.code,
          phone: checkout?.shippingAddress?.phone,
        },
      },
    },
    onCompleted: (data) => {
      if (data?.getClientSecret?.id) {
        const existingId = localStorage.getItem("nauticalPaymentId");
        if (existingId !== data.getClientSecret.id) {
          localStorage.setItem("nauticalPaymentId", data.getClientSecret.id);
        }
      }
      if (data?.getClientSecret?.client_secret) {
        const existingSecret = clientSecret;
        if (existingSecret !== data.getClientSecret.client_secret) {
          setClientSecret(data.getClientSecret.client_secret);
        }
      }
    },
  });

  const handleFormSubmit = async (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const paymentElement = elements?.getElement(PaymentElement);

    if (paymentElement) {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href, // "http://localhost:3000/checkout/",
        },
      });

      if (error) {
        setSubmitErrors([
          // ...submitErrors,
          {
            message: error.message!,
            field: error.code,
          },
        ]);
      }
    }
  };

  const allErrors = [...errors, ...submitErrors];

  const stripeOptions = {
    clientSecret: clientSecret,
  };

  return (
    <div data-test="stripeGateway">
      {stripeOptions.clientSecret ? (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <StripeCreditCardForm
            formId={formId}
            formRef={formRef}
            errors={allErrors}
            onSubmit={handleFormSubmit}
          />
        </Elements>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export { StripePaymentGateway };
