import { PaymentGateway } from "../../fragments/gqlTypes/PaymentGateway";
import { ErrorListener } from "../../helpers";
import {
  ICheckoutModel,
  ICheckoutModelPriceValue,
  IPaymentModel,
} from "../../helpers/LocalStorageHandler";
import { JobsManager } from "../../jobs";
import { NauticalState, NauticalStateLoaded } from "../../state";
import { StateItems } from "../../state/types";

import { PromiseRunResponse } from "../types";
import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
  IAddress,
  IAvailableShippingMethods,
  ICheckout,
  IMultiSellerAvailableShippingMethods_mapping,
  IMultiSellerVolumeDiscount,
  IPayment,
  IPromoCodeDiscount,
  CreatePaymentInput,
  CompleteCheckoutInput,
} from "./types";

type CheckoutResponse = PromiseRunResponse<
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes
>;

export class NauticalCheckoutAPI extends ErrorListener {
  loaded: boolean;

  checkout?: ICheckout;

  promoCodeDiscount?: IPromoCodeDiscount;

  billingAsShipping?: boolean;

  selectedShippingAddressId?: string;

  selectedBillingAddressId?: string;

  availableShippingMethods?: IAvailableShippingMethods;
  availableShippingMethodsBySeller?: IMultiSellerAvailableShippingMethods_mapping[];
  applicableVolumeDiscounts?: ICheckoutModelPriceValue;
  applicableVolumeDiscountsBySeller?: IMultiSellerVolumeDiscount[];
  availablePaymentGateways?: PaymentGateway[];

  payment?: IPayment;

  private nauticalState: NauticalState;

  private jobsManager: JobsManager;

  constructor(nauticalState: NauticalState, jobsManager: JobsManager) {
    super();
    this.nauticalState = nauticalState;
    this.jobsManager = jobsManager;

    this.loaded = false;

    this.nauticalState.subscribeToChange(
      StateItems.CHECKOUT,
      (checkout: ICheckoutModel) => {
        const {
          id,
          token,
          email,
          shippingAddress,
          billingAddress,
          lines,
          selectedShippingAddressId,
          selectedBillingAddressId,
          billingAsShipping,
          availablePaymentGateways,
          availableShippingMethods,
          availableShippingMethodsBySeller,
          applicableVolumeDiscounts,
          shippingMethod,
          sellerShippingMethods,
          promoCodeDiscount,
        } = checkout || {};
        this.checkout = {
          billingAddress,
          email,
          id,
          lines,
          sellerShippingMethods,
          shippingAddress,
          shippingMethod,
          token,
        };
        this.selectedShippingAddressId = selectedShippingAddressId;
        this.selectedBillingAddressId = selectedBillingAddressId;
        this.availablePaymentGateways = availablePaymentGateways;
        this.availableShippingMethods = availableShippingMethods;
        this.availableShippingMethodsBySeller =
          availableShippingMethodsBySeller;
        this.applicableVolumeDiscounts = applicableVolumeDiscounts;
        this.applicableVolumeDiscountsBySeller =
          this.applicableVolumeDiscountsBySeller;
        this.billingAsShipping = billingAsShipping;
        this.promoCodeDiscount = {
          discountName: promoCodeDiscount?.discountName,
          voucherCode: promoCodeDiscount?.voucherCode,
        };
      }
    );
    this.nauticalState.subscribeToChange(
      StateItems.PAYMENT,
      (payment: IPaymentModel) => {
        const { id, token, gateway, creditCard, total } = payment || {};
        this.payment = {
          creditCard,
          gateway,
          id,
          token,
          total,
        };
      }
    );
    this.nauticalState.subscribeToChange(
      StateItems.LOADED,
      (loaded: NauticalStateLoaded) => {
        this.loaded = loaded.checkout && loaded.payment;
      }
    );
  }

  setShippingAddress = async (
    shippingAddress: IAddress,
    email: string
  ): CheckoutResponse => {
    const checkoutId = this.nauticalState.checkout?.id;
    const alteredLines = this.nauticalState.checkout?.lines?.map((item) => ({
      quantity: item!.quantity,
      variantId: item?.variant!.id,
    }));

    if (!alteredLines) {
      return {
        functionError: {
          error: new Error(
            "You need to add items to cart before setting shipping address."
          ),
          type: FunctionErrorCheckoutTypes.ITEMS_NOT_ADDED_TO_CART,
        },
        pending: false,
      };
    }

    const createCheckout = async () => {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "createCheckout",
        {
          email,
          lines: alteredLines,
          selectedShippingAddressId: shippingAddress.id,
          shippingAddress,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    };

    if (!checkoutId) {
      return createCheckout();
    }

    const { data, dataError } = await this.jobsManager.run(
      "checkout",
      "setShippingAddress",
      {
        checkoutId,
        email,
        selectedShippingAddressId: shippingAddress.id,
        shippingAddress,
      }
    );

    const checkoutIdInvalid = dataError?.error?.some(
      (errorItem) =>
        errorItem?.code === "NOT_FOUND" && errorItem?.field === "checkoutId"
    );

    if (checkoutIdInvalid) {
      // In case there is a validation error on the BE that checkout ID is not found - just create new checkout
      return createCheckout();
    }

    return {
      data,
      dataError,
      pending: false,
    };
  };

  setBillingAddress = async (
    billingAddress: IAddress,
    email?: string
  ): CheckoutResponse => {
    const checkoutId = this.nauticalState.checkout?.id;
    const isShippingRequiredForProducts = this.nauticalState.checkout?.lines
      ?.filter((line) => line.quantity > 0)
      .some(({ variant }) => variant.product?.productType.isShippingRequired);
    const alteredLines = this.nauticalState.checkout?.lines?.map((item) => ({
      quantity: item!.quantity,
      variantId: item?.variant!.id,
    }));

    if (
      isShippingRequiredForProducts &&
      checkoutId &&
      this.checkout?.shippingAddress
    ) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setBillingAddress",
        {
          billingAddress,
          billingAsShipping: false,
          checkoutId,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    if (isShippingRequiredForProducts) {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
    if (!isShippingRequiredForProducts && email && checkoutId && alteredLines) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setBillingAddressWithEmail",
        {
          billingAddress,
          checkoutId,
          email,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    if (!isShippingRequiredForProducts && email && alteredLines) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "createCheckout",
        {
          billingAddress,
          email,
          lines: alteredLines,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    if (!isShippingRequiredForProducts && !email) {
      return {
        functionError: {
          error: new Error(
            "You need to provide email when products do not require shipping before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.EMAIL_NOT_SET,
        },
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to add items to cart before setting billing address."
        ),
        type: FunctionErrorCheckoutTypes.ITEMS_NOT_ADDED_TO_CART,
      },
      pending: false,
    };
  };

  setBillingAsShippingAddress = async (
    billingAsShipping: boolean
  ): PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes> => {
    const checkoutId = this.nauticalState.checkout?.id;

    if (checkoutId && this.checkout?.shippingAddress) {
      if (billingAsShipping) {
        const { data, dataError } = await this.jobsManager.run(
          "checkout",
          "setBillingAddress",
          {
            billingAddress: this.checkout.shippingAddress,
            billingAsShipping: true,
            checkoutId,
            selectedBillingAddressId: this.checkout?.shippingAddress.id,
          }
        );

        return {
          data,
          dataError,
          pending: false,
        };
      } else {
        const { data, dataError } = await this.jobsManager.run(
          "checkout",
          "setBillingAddress",
          {
            billingAddress: this.checkout.billingAddress,
            billingAsShipping: false,
            checkoutId,
            selectedBillingAddressId: this.checkout?.billingAddress.id,
          }
        );

        return {
          data,
          dataError,
          pending: false,
        };
      }
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before setting billing address."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  setShippingMethod = async (shippingMethodId: string): CheckoutResponse => {
    const checkoutId = this.nauticalState.checkout?.id;

    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setShippingMethod",
        {
          checkoutId,
          shippingMethodId,
        }
      );
      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before setting shipping method."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  setSellerShippingMethods = async (
    seller: number,
    shippingMethodSelection: string,
    secondaryAddress?: string
  ): CheckoutResponse => {
    const checkoutId = this.nauticalState.checkout?.id;

    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setSellerShippingMethods",
        {
          checkoutId,
          seller,
          shippingMethodSelection,
          secondaryAddress,
        }
      );
      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set a shipping address before setting shipping method."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  addPromoCode = async (promoCode: string): CheckoutResponse => {
    const checkoutId = this.nauticalState.checkout?.id;

    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "addPromoCode",
        {
          checkoutId,
          promoCode,
        }
      );
      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before modifying promo code."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };

  removePromoCode = async (promoCode: string): CheckoutResponse => {
    const checkoutId = this.nauticalState.checkout?.id;

    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "removePromoCode",
        { checkoutId, promoCode }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before modifying promo code."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  createPayment = async (input: CreatePaymentInput): CheckoutResponse => {
    const checkoutId = this.nauticalState.checkout?.id;
    const billingAddress = this.nauticalState.checkout?.billingAddress;
    const amount = this.nauticalState.summaryPrices?.totalPrice?.gross.amount;

    if (
      checkoutId &&
      billingAddress &&
      amount !== null &&
      amount !== undefined
    ) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "createPayment",
        {
          ...input,
          amount,
          billingAddress,
          checkoutId,
        }
      );
      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set billing address before creating payment."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  completeCheckout = async (
    input?: CompleteCheckoutInput
  ): CheckoutResponse => {
    const checkoutId = this.nauticalState.checkout?.id;
    const volumeDiscount =
      this.nauticalState.checkout?.applicableVolumeDiscounts?.amount;
    const volumeDiscountsBySeller =
      this.nauticalState.checkout?.applicableVolumeDiscountsBySeller;

    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "completeCheckout",
        { ...input, checkoutId, volumeDiscount, volumeDiscountsBySeller }
      );
      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before creating payment."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };
}
