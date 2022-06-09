import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
} from "../../api/Checkout/types";
import { cloneDeep } from "lodash";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import {ICheckoutModel, ICheckoutModelLine, LocalStorageHandler} from "../../helpers/LocalStorageHandler";
import { JobRunResponse } from "../types";
import {
  CompleteCheckoutJobInput,
  CreatePaymentJobInput,
  RemovePromoCodeJobInput,
  AddPromoCodeJobInput,
  SetShippingMethodJobInput,
  ProvideCheckoutJobInput,
  CreateCheckoutJobInput,
  SetShippingAddressJobInput,
  SetBillingAddressJobInput,
  SetBillingAddressWithEmailJobInput,
  SetSellerShippingMethodsJobInput,
} from "./types";
import { JobsHandler } from "../JobsHandler";

export type PromiseCheckoutJobRunResponse = Promise<
  JobRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>
>;

class CheckoutJobs extends JobsHandler<{}> {
  private apolloClientManager: ApolloClientManager;

  private localStorageHandler: LocalStorageHandler;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    super();
    this.apolloClientManager = apolloClientManager;
    this.localStorageHandler = localStorageHandler;
  }

  /**
   * Returns partial ICheckoutModel with merged lines from local storage shopping card data
   * and the existing checkout data from the server
   *
   * @param serverCheckout The checkout data provided by the server
   * @param localCheckout The checkout data stored from the local storage
   */
  mergeCheckouts(
    {serverCheckout, localStorageCheckout}:
      { serverCheckout: ICheckoutModel | null; localStorageCheckout: ICheckoutModel | null }): ICheckoutModel | null {
    const linesCount = localStorageCheckout?.lines?.length;

    // If there are no lines in the local storage checkout, nothing to merge yet
    if (!linesCount || linesCount === 0) {
      return null;
    }

    // If server checkout is not exist yet, just skip this merge
    if (!serverCheckout?.id) {
      return null;
    }

    // Looks like local storage contains data from server checkout,
    // so skip this merge
    if (!!localStorageCheckout?.id) {
      return null;
    }

    // We want to submit only partial checkout data
    const checkout: ICheckoutModel = {
      id: serverCheckout.id,
      lines: cloneDeep(serverCheckout.lines),
    };

    let itemsToProcess: ICheckoutModelLine[] = [...localStorageCheckout.lines];

    // If server checkout line exists that matches local checkout line, set server checkout line quantity to local checkout line quantity
    checkout.lines.forEach((serverLine) => {
      const localStorageLine = localStorageCheckout.lines.find((l) => l.variant.id === serverLine.variant.id);

      if (localStorageLine) {
        serverLine.quantity = localStorageLine.quantity;
        itemsToProcess = itemsToProcess.filter(item => item.variant.id === localStorageLine.variant.id)
      } else {
        // If server checkout line exists that does not match any local checkout line, set server checkout line quantity to 0
        serverLine.quantity = 0;
      }
    });

    checkout.lines.push(...itemsToProcess);

    return checkout;
  }

  provideCheckout = async ({
    isUserSignedIn,
  }: ProvideCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const localStorageCheckout = LocalStorageHandler.getCheckout();

    let { data, error } = await this.apolloClientManager.getCheckout(
      isUserSignedIn,
      localStorageCheckout?.token
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.GET_CHECKOUT,
        },
      };
    }

    if (!!data?.id) {
      const mergedCheckout = this.mergeCheckouts({
        serverCheckout: data,
        localStorageCheckout,
      });

      if (mergedCheckout) {
        // TODO Consider to remove getCheckout and use data and error directly from setCartItem()
        //  for now only refresh
        await this.apolloClientManager.setCartItem(mergedCheckout);
        await this.apolloClientManager.getRefreshedCheckoutLines(mergedCheckout.lines);

        ({ data, error } = await this.apolloClientManager.getCheckout(
          isUserSignedIn,
          localStorageCheckout?.token
        ));
      }
    }

    this.localStorageHandler.setCheckout(data || localStorageCheckout);

    return {
      data,
    }
  };

  createCheckout = async ({
    email,
    lines,
    shippingAddress,
    selectedShippingAddressId,
    billingAddress,
    selectedBillingAddressId,
  }: CreateCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.createCheckout(
      email,
      lines,
      shippingAddress,
      billingAddress
    );

    if (error) {
      /**
       * TODO: Differentiate errors!!! THIS IS A BUG!!!
       * DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS is just one of every possible - instead of deprecated errors, checkoutErrors should be used.
       */
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...data,
      selectedBillingAddressId,
      selectedShippingAddressId,
    });
    return {
      data,
    };
  };

  setShippingAddress = async ({
    checkoutId,
    shippingAddress,
    email,
    selectedShippingAddressId,
  }: SetShippingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setShippingAddress(
      shippingAddress,
      email,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      availableShippingMethods: data?.availableShippingMethods,
      availableShippingMethodsBySeller: data?.availableShippingMethodsBySeller,
      billingAsShipping: false,
      email: data?.email,
      selectedShippingAddressId,
      shippingAddress: data?.shippingAddress,
    });
    return { data };
  };

  setBillingAddress = async ({
    checkoutId,
    billingAddress,
    billingAsShipping,
    selectedBillingAddressId,
  }: SetBillingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setBillingAddress(
      billingAddress,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      availablePaymentGateways: data?.availablePaymentGateways,
      billingAddress: data?.billingAddress,
      billingAsShipping: !!billingAsShipping,
      selectedBillingAddressId,
    });
    return { data };
  };

  setBillingAddressWithEmail = async ({
    checkoutId,
    email,
    billingAddress,
    selectedBillingAddressId,
  }: SetBillingAddressWithEmailJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } =
      await this.apolloClientManager.setBillingAddressWithEmail(
        billingAddress,
        email,
        checkoutId
      );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      availablePaymentGateways: data?.availablePaymentGateways,
      billingAddress: data?.billingAddress,
      billingAsShipping: false,
      email: data?.email,
      selectedBillingAddressId,
    });
    return { data };
  };

  setShippingMethod = async ({
    checkoutId,
    shippingMethodId,
  }: SetShippingMethodJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setShippingMethod(
      shippingMethodId,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      promoCodeDiscount: data?.promoCodeDiscount,
      shippingMethod: data?.shippingMethod,
    });
    return { data };
  };

  setSellerShippingMethods = async ({
    checkoutId,
    seller,
    shippingMethodSelection,
    secondaryAddress,
  }: SetSellerShippingMethodsJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } =
      await this.apolloClientManager.setSellerShippingMethods(
        checkoutId,
        seller,
        shippingMethodSelection,
        secondaryAddress
      );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      lines: data?.lines,
      promoCodeDiscount: data?.promoCodeDiscount,
      // THIS WAS THE BUG CAUSING THE SELLER_SHIPPING_METHODS UPDATE TO NOT
      // REGISTER CORRECTLY FOR DETERMINING CHECKOUT STEP
      // shippingMethod: data?.shippingMethod,
      sellerShippingMethods: data?.sellerShippingMethods,
    });
    return { data };
  };

  addPromoCode = async ({
    checkoutId,
    promoCode,
  }: AddPromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.addPromoCode(
      promoCode,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      promoCodeDiscount: data?.promoCodeDiscount,
    });
    return { data };
  };

  removePromoCode = async ({
    checkoutId,
    promoCode,
  }: RemovePromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.removePromoCode(
      promoCode,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.REMOVE_PROMO_CODE,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      promoCodeDiscount: data?.promoCodeDiscount,
    });
    return { data };
  };

  createPayment = async ({
    checkoutId,
    amount,
    gateway,
    token,
    billingAddress,
    creditCard,
    returnUrl,
  }: CreatePaymentJobInput): PromiseCheckoutJobRunResponse => {
    const payment = LocalStorageHandler.getPayment();

    const { data, error } = await this.apolloClientManager.createPayment({
      amount,
      billingAddress,
      checkoutId,
      gateway,
      returnUrl,
      token,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_PAYMENT,
        },
      };
    }

    this.localStorageHandler.setPayment({
      ...payment,
      creditCard,
      gateway: data?.gateway,
      id: data?.id,
      token: data?.token,
      total: data?.total,
    });
    return { data };
  };

  completeCheckout = async ({
    checkoutId,
    paymentData,
    redirectUrl,
    storeSource,
    affiliate,
    microsite,
    poNumber,
    volumeDiscount,
    volumeDiscountsBySeller,
  }: CompleteCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.completeCheckout({
      checkoutId,
      paymentData,
      redirectUrl,
      storeSource,
      affiliate,
      microsite,
      poNumber,
      volumeDiscount,
      volumeDiscountsBySeller,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    }

    if (!data?.confirmationNeeded) {
      this.localStorageHandler.setCheckout({});
      this.localStorageHandler.setPayment({});
      localStorage.removeItem("nauticalPaymentId");
    }

    return { data };
  };
}

export default CheckoutJobs;
