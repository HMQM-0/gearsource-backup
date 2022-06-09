import { ApolloClientManager } from "../data/ApolloClientManager";
import { LocalStorageHandler } from "../helpers/LocalStorageHandler";
import { AuthJobs } from "./Auth";
import { CheckoutJobs } from "./Checkout";
import { AffiliateJobs } from "./Affiliates";

export interface IJobs {
  auth: AuthJobs;
  checkout: CheckoutJobs;
  affiliates: AffiliateJobs;
}

export class Jobs implements IJobs {
  auth: AuthJobs;

  checkout: CheckoutJobs;

  affiliates: AffiliateJobs;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    this.auth = new AuthJobs(localStorageHandler, apolloClientManager);
    this.checkout = new CheckoutJobs(localStorageHandler, apolloClientManager);
    // this.affiliates = new AffiliateJobs(localStorageHandler, apolloClientManager);
    this.affiliates = new AffiliateJobs(apolloClientManager);
  }
}
