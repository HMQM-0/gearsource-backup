import { useEffect, useState } from "react";

import {
  CHECKOUT_STEPS,
  CheckoutStep,
  // MICROSITE_CHECKOUT_STEPS,
} from "@temp/core/config";

/**
 * Gets checkout step based on the provided path.
 */
export const useCheckoutStepFromPath = (
  path: string,
  isMicrosite: boolean
): CheckoutStep | null => {
  const getStep = () => {
    // const pathItem = isMicrosite
    //   ? MICROSITE_CHECKOUT_STEPS.find(({ link }) =>
    //       link.replace(/\//g, "").includes(path.replace(/\//g, ""))
    //     )
    //   : CHECKOUT_STEPS.find(({ link }) =>
    //       path.replace(/\//g, "").includes(link.replace(/\//g, ""))
    //     );
    const pathItem = CHECKOUT_STEPS.find(({ link }) =>
      path.replace(/\//g, "").includes(link.replace(/\//g, ""))
    );

    return pathItem ? pathItem.step : null;
  };

  const [step, setStep] = useState(getStep());

  useEffect(() => {
    const newStep = getStep();
    if (step !== newStep) {
      setStep(newStep);
    }
  }, [path]);

  return step;
};
