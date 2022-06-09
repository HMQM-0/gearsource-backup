import React from "react";
import { Navigate } from "react-router";
import {
  Route,
  // RouteComponentProps,
  Routes,
  useLocation,
} from "react-router-dom";

import { useCheckoutStepFromPath, useCheckoutStepState } from "@hooks";
// import { IItems, ITotalPrice } from "@nautical/sdk/lib/api/Cart/types";
import { IItems, ITotalPrice } from "@nautical/api/Cart/types";
// import { ICheckout, IPayment } from "@nautical/sdk/lib/api/Checkout/types";
import { ICheckout, IPayment } from "@nautical/api/Checkout/types";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { checkIfShippingRequiredForProducts } from "@utils/core";
import { isMicrosite } from "@temp/core/utils";

interface IRouterProps {
  items?: IItems;
  checkout?: ICheckout;
  payment?: IPayment;
  totalPrice?: ITotalPrice;
  // renderAddress: (props: RouteComponentProps<any>) => React.ReactNode;
  // renderShipping: (props: RouteComponentProps<any>) => React.ReactNode;
  // renderPayment: (props: RouteComponentProps<any>) => React.ReactNode;
  // renderReview: (props: RouteComponentProps<any>) => React.ReactNode;
  renderAddress: (props: any) => React.ReactNode;
  renderShipping: (props: any) => React.ReactNode;
  renderPayment: (props: any) => React.ReactNode;
  renderReview: (props: any) => React.ReactNode;
}

const CheckoutRouter: React.FC<IRouterProps> = ({
  items,
  checkout,
  payment,
  totalPrice,
  renderAddress,
  renderShipping,
  renderPayment,
  renderReview,
}: IRouterProps) => {
  const { pathname } = useLocation();
  const { recommendedStep, maxPossibleStep } = useCheckoutStepState(
    items,
    checkout,
    payment,
    totalPrice
  );
  const stepFromPath = useCheckoutStepFromPath(pathname, !!isMicrosite());

  const isShippingRequiredForProducts =
    checkIfShippingRequiredForProducts(items);

  const getStepLink = () => {
    // return !!isMicrosite()
    //   ? MICROSITE_CHECKOUT_STEPS.find(
    //       (stepObj) => stepObj.step === recommendedStep
    //     )?.link || MICROSITE_CHECKOUT_STEPS[0].link
    //   : CHECKOUT_STEPS.find((stepObj) => stepObj.step === recommendedStep)
    //       ?.link || CHECKOUT_STEPS[0].link;
    return (
      CHECKOUT_STEPS.find((stepObj) => stepObj.step === recommendedStep)
        ?.link || CHECKOUT_STEPS[0].link
    );
  };

  if (
    (!pathname.includes(CHECKOUT_STEPS[4].link) &&
      (!stepFromPath || (stepFromPath && maxPossibleStep < stepFromPath))) ||
    (pathname.includes(CHECKOUT_STEPS[1].link) &&
      !isShippingRequiredForProducts) // ||
    // (!!isMicrosite() &&
    //   ((!pathname.includes(MICROSITE_CHECKOUT_STEPS[4].link) &&
    //     (!stepFromPath || (stepFromPath && maxPossibleStep < stepFromPath))) ||
    //     (pathname.includes(MICROSITE_CHECKOUT_STEPS[1].link) &&
    //       !isShippingRequiredForProducts)))
  ) {
    return <Navigate to={getStepLink()} replace />;
  }

  return (
    <Routes>
      <Route path={CHECKOUT_STEPS[4].link} element={renderReview} />
      <Route path={CHECKOUT_STEPS[0].link} element={renderAddress} />
      <Route path={CHECKOUT_STEPS[1].link} element={renderShipping} />
      <Route path={CHECKOUT_STEPS[2].link} element={renderPayment} />
      <Route path={CHECKOUT_STEPS[3].link} element={renderReview} />
      {/* {!!isMicrosite() && (
        <Route path={MICROSITE_CHECKOUT_STEPS[4].link} element={renderReview} />
      )}
      {!!isMicrosite() && (
        <Route
          path={MICROSITE_CHECKOUT_STEPS[0].link}
          element={renderAddress}
        />
      )}
      {!!isMicrosite() && (
        <Route
          path={MICROSITE_CHECKOUT_STEPS[1].link}
          element={renderShipping}
        />
      )}
      {!!isMicrosite() && (
        <Route
          path={MICROSITE_CHECKOUT_STEPS[2].link}
          element={renderPayment}
        />
      )}
      {!!isMicrosite() && (
        <Route path={MICROSITE_CHECKOUT_STEPS[3].link} element={renderReview} />
      )} */}
      <Route
        element={(props: any) => (
          <Navigate {...props} to={getStepLink()} replace />
        )}
      />
    </Routes>
  );
};

export { CheckoutRouter };
