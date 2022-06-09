import { round } from "lodash";

import { ApolloClientManager } from "../data/ApolloClientManager";
import { PaymentGateway } from "../fragments/gqlTypes/PaymentGateway";
import { User } from "../fragments/gqlTypes/User";
import { NamedObservable } from "../helpers";
import {
  ICheckoutModel,
  IPaymentModel,
  LocalStorageEvents,
  LocalStorageHandler,
  LocalStorageItems,
} from "../helpers/LocalStorageHandler";
import { JobsManager } from "../jobs";
import { Config } from "../types";
import { INauticalStateSummeryPrices, StateItems } from "./types";
import { AuthJobsEvents } from "../jobs/Auth";
import { BROWSER_NO_CREDENTIAL_API_MESSAGE } from "../api/Auth";

export interface NauticalStateLoaded {
  user: boolean;
  signInToken: boolean;
  checkout: boolean;
  payment: boolean;
  summaryPrices: boolean;
}

const defaultNauticalStateLoaded = {
  checkout: false,
  payment: false,
  signInToken: false,
  summaryPrices: false,
  user: false,
};

export class NauticalState extends NamedObservable<StateItems> {
  user?: User | null;

  signInToken?: string | null;

  signInTokenRefreshing?: boolean;

  signInTokenVerifying?: boolean;

  checkout?: ICheckoutModel;

  promoCode?: string;

  selectedShippingAddressId?: string;

  selectedBillingAddressId?: string;

  payment?: IPaymentModel | null;

  summaryPrices?: INauticalStateSummeryPrices;

  // Should be changed it in future to shop object containing payment gateways besides all the shop data
  availablePaymentGateways?: PaymentGateway[] | null;

  loaded: NauticalStateLoaded;

  private apolloClientManager: ApolloClientManager;

  private jobsManager: JobsManager;

  private localStorageHandler: LocalStorageHandler;

  constructor(
    config: Config,
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager,
    jobsManager: JobsManager
  ) {
    super();
    this.localStorageHandler = localStorageHandler;
    this.apolloClientManager = apolloClientManager;
    this.jobsManager = jobsManager;

    this.loaded = defaultNauticalStateLoaded;
    this.onSignInTokenUpdate(LocalStorageHandler.getSignInToken());

    this.subscribeStateToChanges();
    this.initializeState(config);
  }

  /**
   * Subscribes to particular changes occuring in data sources like apollo cache or local storage.
   * Every update in data source will result in update of respective class member.
   */
  private subscribeStateToChanges = () => {
    this.localStorageHandler.subscribeToChange(
      LocalStorageItems.CHECKOUT,
      this.onCheckoutUpdate
    );
    this.localStorageHandler.subscribeToChange(
      LocalStorageItems.PAYMENT,
      this.onPaymentUpdate
    );
    this.localStorageHandler.subscribeToChange(
      LocalStorageItems.TOKEN,
      this.onSignInTokenUpdate
    );
    this.localStorageHandler.subscribeToChange(
      LocalStorageEvents.CLEAR,
      this.onClearLocalStorage
    );
    this.apolloClientManager.subscribeToUserChange(this.onUserUpdate);
    this.jobsManager.attachEventListener("auth", (event, value) => {
      if (event === AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING) {
        this.onSignInTokenRefreshUpdate(value);
      }
    });
  };

  /**
   * Initialize class members with cached or fetched data.
   */
  private initializeState = async (config: Config) => {
    /**
     * Before making any fetch, first try to verify token if it exists.
     */
    if (LocalStorageHandler.getSignInToken()) {
      this.onSignInTokenVerifyingUpdate(true);
      await this.verityToken();
    }
    this.onSignInTokenVerifyingUpdate(false);

    /**
     * Proceed with state initialization.
     */
    if (config.loadOnStart.auth) {
      await this.jobsManager.run("auth", "provideUser", undefined);
    }
    if (config.loadOnStart.checkout) {
      await this.jobsManager.run("checkout", "provideCheckout", {
        isUserSignedIn: !!this.user,
      });
      this.onPaymentUpdate(LocalStorageHandler.getPayment());
    }
  };

  private verityToken = async () => {
    const { data, dataError } = await this.jobsManager.run(
      "auth",
      "verifySignInToken",
      undefined
    );

    if (dataError || !data?.isValid) {
      await this.jobsManager.run("auth", "signOut", undefined);
      try {
        if (navigator.credentials?.preventSilentAccess) {
          await navigator.credentials.preventSilentAccess();
        }
      } catch (credentialsError) {
        // eslint-disable-next-line no-console
        console.warn(BROWSER_NO_CREDENTIAL_API_MESSAGE, credentialsError);
      }
    }
  };

  private onLoadedUpdate = (newLoaded: Partial<NauticalStateLoaded>) => {
    this.loaded = {
      ...this.loaded,
      ...newLoaded,
    };
    this.notifyChange(StateItems.LOADED, this.loaded);
  };

  private onClearLocalStorage = () => {
    this.onSignInTokenUpdate(null);
    this.onUserUpdate(null);
    this.onCheckoutUpdate();
    this.onPaymentUpdate();
  };

  private onSignInTokenUpdate = (token: string | null) => {
    this.signInToken = token;
    this.notifyChange(StateItems.SIGN_IN_TOKEN, this.signInToken);
    this.onLoadedUpdate({
      signInToken: true,
    });
  };

  private onSignInTokenVerifyingUpdate = (tokenVerifying: boolean) => {
    this.signInTokenVerifying = tokenVerifying;
    this.notifyChange(
      StateItems.SIGN_IN_TOKEN_VERIFYING,
      this.signInTokenVerifying
    );
  };

  private onSignInTokenRefreshUpdate = (tokenRefreshing: boolean) => {
    this.signInTokenRefreshing = tokenRefreshing;
    this.notifyChange(
      StateItems.SIGN_IN_TOKEN_REFRESHING,
      this.signInTokenRefreshing
    );
  };

  private onUserUpdate = (user: User | null) => {
    this.user = user;
    this.notifyChange(StateItems.USER, this.user);
    this.onLoadedUpdate({
      user: true,
    });
  };

  private onCheckoutUpdate = (checkout?: ICheckoutModel) => {
    this.checkout = checkout;
    this.summaryPrices = NauticalState.calculateSummaryPrices(checkout);
    this.notifyChange(StateItems.CHECKOUT, this.checkout);
    this.notifyChange(StateItems.SUMMARY_PRICES, this.summaryPrices);
    this.onLoadedUpdate({
      checkout: true,
      summaryPrices: true,
    });
  };

  private onPaymentUpdate = (payment?: IPaymentModel | null) => {
    this.payment = payment;
    this.notifyChange(StateItems.PAYMENT, this.payment);
    this.onLoadedUpdate({
      payment: true,
    });
  };

  private static calculateSummaryPrices(
    checkout?: ICheckoutModel
  ): INauticalStateSummeryPrices {
    const items = checkout?.lines;
    const shippingMethod = checkout?.shippingMethod;
    const promoCodeDiscount = checkout?.promoCodeDiscount?.discount;

    const volumeDiscount = checkout?.applicableVolumeDiscounts;

    const sellerShippingMethods = checkout?.sellerShippingMethods;

    const sellerMethods = sellerShippingMethods
      ? // @ts-ignore
        JSON.parse(sellerShippingMethods)
      : null;
    let totalShippingPrice = 0.0;
    if (sellerMethods !== null) {
      // @ts-ignore
      totalShippingPrice = sellerMethods
        .map((method) => method.shippingMethod.price)
        .reduce((a, b) => parseFloat(a) + parseFloat(b), 0.0);
    }

    if (items && items.length) {
      const firstItemTotalPrice = items[0].totalPrice;

      if (firstItemTotalPrice) {
        const shippingPrice = {
          ...shippingMethod?.price,
          amount: totalShippingPrice || 0,
          currency:
            shippingMethod?.price?.currency ||
            firstItemTotalPrice.gross.currency,
        };

        const itemsNetPrice = items.reduce(
          (accumulatorPrice, line) =>
            accumulatorPrice + (line.totalPrice?.net.amount || 0),
          0
        );
        const itemsGrossPrice = items.reduce(
          (accumulatorPrice, line) =>
            accumulatorPrice + (line.totalPrice?.gross?.amount || 0),
          0
        );

        const subtotalPrice = {
          ...firstItemTotalPrice,
          gross: {
            ...firstItemTotalPrice.gross,
            amount: round(itemsGrossPrice, 2),
          },
          net: {
            ...firstItemTotalPrice.net,
            amount: round(itemsNetPrice, 2),
          },
        };

        const discount = {
          ...promoCodeDiscount,
          amount: promoCodeDiscount?.amount || 0,
          currency:
            promoCodeDiscount?.currency || firstItemTotalPrice.gross.currency,
        };

        const volDiscount = volumeDiscount?.amount || 0.0;

        const totalPrice = {
          ...subtotalPrice,
          gross: {
            ...subtotalPrice.gross,
            amount: round(
              // itemsGrossPrice + shippingPrice.amount - discount.amount,
              itemsGrossPrice +
                totalShippingPrice -
                discount.amount -
                volDiscount,
              2
            ),
          },
          net: {
            ...subtotalPrice.net,
            amount: round(
              // itemsNetPrice + shippingPrice.amount - discount.amount,
              itemsNetPrice +
                totalShippingPrice -
                discount.amount -
                volDiscount,
              2
            ),
          },
        };

        return {
          discount,
          shippingPrice,
          subtotalPrice,
          totalPrice,
        };
      }
    }
    return {};
  }
}
