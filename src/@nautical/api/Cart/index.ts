import { LocalStorageManager } from "../../data";
import { ErrorListener } from "../../helpers";
import { ICheckoutModel } from "../../helpers/LocalStorageHandler";
import { JobsManager } from "../../jobs";
import { ErrorCartTypes } from "../../jobs/Cart";
import { NauticalState, NauticalStateLoaded } from "../../state";
import { INauticalStateSummeryPrices, StateItems } from "../../state/types";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { sortCheckoutLines } from "./utils";

import {
  IDiscount,
  IItems,
  IShippingPrice,
  ISubtotalPrice,
  ITotalPrice,
} from "./types";

export class NauticalCartAPI extends ErrorListener {
  loaded: boolean;

  items: IItems;

  totalPrice: ITotalPrice;

  subtotalPrice: ISubtotalPrice;

  shippingPrice: IShippingPrice;

  discount?: IDiscount;

  private apolloClientManager: ApolloClientManager;

  private jobsManager: JobsManager;

  private localStorageManager: LocalStorageManager;

  private nauticalState: NauticalState;

  constructor(
    localStorageManager: LocalStorageManager,
    apolloClientManager: ApolloClientManager,
    nauticalState: NauticalState,
    jobsManager: JobsManager
  ) {
    super();
    this.nauticalState = nauticalState;
    this.localStorageManager = localStorageManager;
    this.apolloClientManager = apolloClientManager;
    this.jobsManager = jobsManager;

    this.loaded = false;

    this.jobsManager.attachErrorListener("cart", this.fireError);

    this.nauticalState.subscribeToChange(
      StateItems.CHECKOUT,
      (checkout: ICheckoutModel) => {
        this.items = checkout?.lines
          ?.filter((line) => line.quantity > 0)
          .sort(sortCheckoutLines);
      }
    );
    this.nauticalState.subscribeToChange(
      StateItems.SUMMARY_PRICES,
      (summaryPrices: INauticalStateSummeryPrices) => {
        const { totalPrice, subtotalPrice, shippingPrice, discount } =
          summaryPrices || {};
        this.totalPrice = totalPrice;
        this.subtotalPrice = subtotalPrice;
        this.shippingPrice = shippingPrice;
        this.discount = discount;
      }
    );
    this.nauticalState.subscribeToChange(
      StateItems.LOADED,
      (loaded: NauticalStateLoaded) => {
        this.loaded = loaded.checkout && loaded.summaryPrices;
      }
    );
  }

  addItem = async (variantId: string, quantity: number) => {
    // 1. save in local storage
    this.localStorageManager.addItemToCart(variantId, quantity);

    // 2. save online if possible (if checkout id available)
    if (this.nauticalState.checkout?.lines) {
      const { data, error } =
        await this.apolloClientManager.getRefreshedCheckoutLines(
          this.nauticalState.checkout.lines
        );

      if (error) {
        this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
      } else {
        this.localStorageManager.getHandler().setCheckout({
          ...this.nauticalState.checkout,
          lines: data,
        });
      }
    }
    if (this.nauticalState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  removeItem = async (variantId: string) => {
    // 1. save in local storage
    this.localStorageManager.removeItemFromCart(variantId);
    // 2. save online if possible (if checkout id available)
    if (this.nauticalState.checkout?.lines) {
      const { data, error } =
        await this.apolloClientManager.getRefreshedCheckoutLines(
          this.nauticalState.checkout.lines
        );

      if (error) {
        this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
      } else {
        this.localStorageManager.getHandler().setCheckout({
          ...this.nauticalState.checkout,
          lines: data,
        });
      }
    }
    if (this.nauticalState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  subtractItem = async (variantId: string) => {
    // 1. save in local storage
    this.localStorageManager.subtractItemFromCart(variantId);

    // 2. save online if possible (if checkout id available)
    if (this.nauticalState.checkout?.lines) {
      const { data, error } =
        await this.apolloClientManager.getRefreshedCheckoutLines(
          this.nauticalState.checkout.lines
        );

      if (error) {
        this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
      } else {
        this.localStorageManager.getHandler().setCheckout({
          ...this.nauticalState.checkout,
          lines: data,
        });
      }
    }
    if (this.nauticalState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  updateItem = async (variantId: string, quantity: number) => {
    // 1. save in local storage
    this.localStorageManager.updateItemInCart(variantId, quantity);

    // 2. save online if possible (if checkout id available)
    if (this.nauticalState.checkout?.lines) {
      const { data, error } =
        await this.apolloClientManager.getRefreshedCheckoutLines(
          this.nauticalState.checkout.lines
        );

      if (error) {
        this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
      } else {
        this.localStorageManager.getHandler().setCheckout({
          ...this.nauticalState.checkout,
          lines: data,
        });
      }
    }
    if (this.nauticalState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  itemInCart = (variantId: string) => {
    // 1. check in local storage
    // const isInLocalCart = this.localStorageManager.isItemInCart(variantId);

    // 2. check online
    // if (this.nauticalState.checkout?.lines) {
    //   const {
    //     data,
    //     error,
    //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
    //     this.nauticalState.checkout?.lines
    //   );

    //   if (error) {
    //     this.fireError(error, ErrorCartTypes.REFRESH_LINES);
    //   } else {
    //     this.localStorageManager.getHandler().setCheckout({
    //       ...this.nauticalState.checkout,
    //       lines: data,
    //     });
    //   }
    // }

    // const inCart = this.localStorageManager.isItemInCart(variantId);

    return this.localStorageManager.isItemInCart(variantId);

    // if (isInLocalCart && isInOnlineCart) {
    //   return true;
    // } else if (isInLocalCart && !isInOnlineCart) {
    //   console.info("ITEM IN LOCAL CART BUT NOT ONLINE CART");
    //   return true;
    // } else if (!isInLocalCart && isInOnlineCart) {
    //   console.info("ITEM IN ONLINE CART BUT NOT LOCAL CART");
    //   return true;
    // } else {
    //   return false;
    // }
  };
}
