import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// import { RouteComponentProps } from "react-router";

import { CheckoutShipping } from "@components/organisms";
// import { useCheckout } from "@nautical/sdk";
import { useCheckout } from "@nautical/react";
import { IFormError } from "@types";

export interface ICheckoutShippingSubpageHandles {
  submitShipping: () => void;
}

// interface IProps extends RouteComponentProps<any> {
interface IProps {
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: () => void;
}

const CheckoutShippingSubpageWithRef: RefForwardingComponent<
  ICheckoutShippingSubpageHandles,
  IProps
> = ({ changeSubmitProgress, onSubmitSuccess, ...props }: IProps, ref) => {
  const checkoutShippingFormId = "shipping-form";
  const checkoutShippingFormRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<IFormError[]>([]);

  const {
    availableShippingMethodsBySeller,
    checkout,
    // availableShippingMethods,
    // setShippingMethod,
    setSellerShippingMethods,
  } = useCheckout();

  // const shippingMethods = availableShippingMethods
  //   ? availableShippingMethods
  //   : [];

  /* const sellerShippingMethods = availableShippingMethodsBySeller
    ? availableShippingMethodsBySeller
    : []; */

  useImperativeHandle(ref, () => ({
    submitShipping: () => {
      checkoutShippingFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    },
  }));

  /* const handleSetShippingMethod = async (shippingMethodId: string) => {
    changeSubmitProgress(true);
    const { dataError } = await setShippingMethod(shippingMethodId);
    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      setErrors(errors);
    } else {
      setErrors([]);
      onSubmitSuccess();
    }
  }; */

  const handleSetSellerShippingMethods = async (
    seller: number,
    shippingMethodSelection: string
  ) => {
    changeSubmitProgress(true);
    // await setShippingMethod(shippingMethodSelection)
    const { dataError } = await setSellerShippingMethods(
      seller,
      shippingMethodSelection
    );
    const errors = dataError?.error;
    changeSubmitProgress(false);
    if (errors) {
      setErrors(errors);
    } else {
      setErrors([]);
      onSubmitSuccess();
    }
  };

  // const sellerLines = checkout?.lines?.map((line) => ({name: line.seller, mapping: line}))

  const sellers = checkout?.lines?.map((line) => line.seller);

  const sellerSet = new Set(sellers);

  let mappingDict = {};

  for (const seller of sellerSet) {
    // @ts-ignore
    mappingDict[seller] = checkout?.lines?.filter(
      (line) => line.seller === seller
    );
  }

  return (
    <CheckoutShipping
      {...props}
      // shippingMethods={shippingMethods}
      // selectedShippingMethodId={checkout?.shippingMethod?.id}
      // TODO: FIX TYPING ERROR HERE
      // @ts-ignore
      selectedShippingMethodIds={checkout?.sellerShippingMethods}
      sellerLineMapping={mappingDict}
      // sellerShippingMethods={sellerShippingMethods}
      sellerShippingMethods={availableShippingMethodsBySeller}
      errors={errors}
      setErrors={setErrors}
      // selectShippingMethod={handleSetShippingMethod}
      selectSellerShippingMethods={handleSetSellerShippingMethods}
      formId={checkoutShippingFormId}
      formRef={checkoutShippingFormRef}
    />
  );
};

const CheckoutShippingSubpage = forwardRef(CheckoutShippingSubpageWithRef);

export { CheckoutShippingSubpage };
