import { useEffect, useState } from "react";

// import { IItems, ITotalPrice } from "@nautical/sdk/lib/api/Cart/types";
import { IItems, ITotalPrice } from "@nautical/api/Cart/types";
// import { ICheckout, IPayment } from "@nautical/sdk/lib/api/Checkout/types";
import { ICheckout, IPayment } from "@nautical/api/Checkout/types";
import { CheckoutStep } from "@temp/core/config";
import { checkIfShippingRequiredForProducts } from "@utils/core";
import { isPriceEqual } from "@utils/money";

interface StepState {
  recommendedStep: CheckoutStep;
  maxPossibleStep: CheckoutStep;
}

export const useCheckoutStepState = (
  items?: IItems,
  checkout?: ICheckout,
  payment?: IPayment,
  totalPrice?: ITotalPrice
): StepState => {
  const isShippingRequiredForProducts =
    checkIfShippingRequiredForProducts(items);
  const isCheckoutPriceEqualPaymentPrice =
    payment?.total &&
    totalPrice?.gross &&
    isPriceEqual(payment.total, totalPrice.gross);

  const getMaxPossibleStep = () => {
    if (!checkout?.id && items) {
      // we are creating checkout during address set up
      return CheckoutStep.Address;
    }

    const isShippingAddressSet =
      !isShippingRequiredForProducts || !!checkout?.shippingAddress;
    const isBillingAddressSet = !!checkout?.billingAddress;
    const isShippingMethodSet =
      // !isShippingRequiredForProducts || !!checkout?.shippingMethod;
      !isShippingRequiredForProducts ||
      checkout?.sellerShippingMethods?.length > 0;
    const isPaymentMethodSet =
      !!payment?.id && isCheckoutPriceEqualPaymentPrice;

    if (!isShippingAddressSet || !isBillingAddressSet) {
      return CheckoutStep.Address;
    }
    if (!isShippingMethodSet) {
      return CheckoutStep.Shipping;
    }
    if (!isPaymentMethodSet) {
      return CheckoutStep.Payment;
    }
    return CheckoutStep.Review;
  };

  const getRecommendedStep = (newMaxPossibleStep: CheckoutStep) => {
    const isPaymentRecreateRequired =
      newMaxPossibleStep > CheckoutStep.Shipping &&
      !isCheckoutPriceEqualPaymentPrice;

    if (isPaymentRecreateRequired && isShippingRequiredForProducts) {
      return CheckoutStep.Shipping;
    }
    if (isPaymentRecreateRequired) {
      return CheckoutStep.Payment;
    }
    return newMaxPossibleStep;
  };

  const [maxPossibleStep, setMaxPossibleStep] = useState(getMaxPossibleStep());
  const [recommendedStep, setRecommendedStep] = useState(
    getRecommendedStep(maxPossibleStep)
  );

  useEffect(() => {
    const newMaxPossibleStep = getMaxPossibleStep();
    const newRecommendedStep = getRecommendedStep(newMaxPossibleStep);
    if (maxPossibleStep !== newMaxPossibleStep) {
      setMaxPossibleStep(newMaxPossibleStep);
    }
    if (recommendedStep !== newRecommendedStep) {
      setRecommendedStep(newRecommendedStep);
    }
  }, [checkout, items, payment, totalPrice]);

  return { recommendedStep, maxPossibleStep };
};
