import { ApolloClient } from "@apollo/client";

import { defaultConfig } from "../config";
import { LocalStorageManager } from "../data";
import { ApolloClientManager } from "../data/ApolloClientManager";
import { LocalStorageHandler } from "../helpers/LocalStorageHandler";
import { JobsManager } from "../jobs";
import { NauticalState } from "../state";
import { ConfigInput } from "../types";
import { AuthAPI } from "./Auth";
import APIProxy from "./APIProxy";
import { NauticalCartAPI } from "./Cart";
import { NauticalCheckoutAPI } from "./Checkout";
import { CollectionsAPI } from "./collections/collections";
import { CategoriesAPI } from "./categories/categories";
import { ProductsAPI } from "./products/products";
import { AffiliatesAPI } from "./Affiliates";

export * from "./Checkout";
export * from "./Cart";

export class NauticalAPI {
  auth: AuthAPI;

  affiliates: AffiliatesAPI;

  checkout: NauticalCheckoutAPI;

  cart: NauticalCartAPI;

  categories: CategoriesAPI;

  collections: CollectionsAPI;

  products: ProductsAPI;

  /**
   * @deprecated Please do not use it anymore. Reference to API Proxy will be removed in future.
   * Now it just exists for legacy React hooks, which also will be removed.
   */
  legacyAPIProxy: APIProxy;

  constructor(
    client: ApolloClient<any>,
    apiProxy: APIProxy,
    config: ConfigInput,
    onStateUpdate?: () => any
  ) {
    this.legacyAPIProxy = apiProxy;
    const finalConfig = {
      ...defaultConfig,
      ...config,
      loadOnStart: {
        ...defaultConfig.loadOnStart,
        ...config?.loadOnStart,
      },
    };

    const localStorageHandler = new LocalStorageHandler();
    const apolloClientManager = new ApolloClientManager(client);
    const jobsManager = new JobsManager(
      localStorageHandler,
      apolloClientManager
    );
    const nauticalState = new NauticalState(
      finalConfig,
      localStorageHandler,
      apolloClientManager,
      jobsManager
    );
    const localStorageManager = new LocalStorageManager(
      localStorageHandler,
      nauticalState
    );

    if (onStateUpdate) {
      nauticalState.subscribeToNotifiedChanges(onStateUpdate);
    }

    this.auth = new AuthAPI(nauticalState, jobsManager, finalConfig);
    this.affiliates = new AffiliatesAPI(client, jobsManager);
    this.checkout = new NauticalCheckoutAPI(nauticalState, jobsManager);
    this.cart = new NauticalCartAPI(
      localStorageManager,
      apolloClientManager,
      nauticalState,
      jobsManager
    );
    this.categories = new CategoriesAPI(client);
    this.collections = new CollectionsAPI(client);
    this.products = new ProductsAPI(client);

    this.legacyAPIProxy.attachAuthListener((authenticated) => {
      if (!authenticated) {
        localStorageHandler.setCheckout({});
        localStorageHandler.setPayment({});
        localStorageHandler.setJobs(null);
      }
    });
  }
}
