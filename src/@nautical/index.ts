import { ApolloClient } from "@apollo/client";

import { NauticalAPI } from "./api";
import { ConfigInput, ApolloConfigInput } from "./types";
import APIProxy from "./api/APIProxy";
import { createNauticalLinks } from "./links";
import { createNauticalClient } from "./client";
import { createNauticalCache } from "./cache";

interface CreateAPIResult {
  api: NauticalAPI;
  apiProxy: APIProxy;
  apolloClient: ApolloClient<any>;
}

interface ConnectResult {
  /**
   * Nautical API.
   */
  api: NauticalAPI;
  /**
   * Apollo client used by Nautical API.
   */
  apolloClient: ApolloClient<any>;
}

export class NauticalManager {
  private config: ConfigInput;

  private apolloConfig: ApolloConfigInput;

  private apiProxy?: APIProxy;

  private api?: NauticalAPI;

  private apolloClient?: ApolloClient<any>;

  private tokenRefreshing: boolean = false;

  private apiChangeListener?: (api?: NauticalAPI) => any;

  constructor(config: ConfigInput, apolloConfig?: ApolloConfigInput) {
    this.config = config;
    this.apolloConfig = {
      persistCache: true,
      ...apolloConfig,
    };
  }

  /**
   * Use this method to obtain current API and optionally listen to its update on occured changes within it.
   * @param apiChangeListener Function called to get an API and called on every API update.
   */
  async connect(
    apiChangeListener?: (api?: NauticalAPI) => any
  ): Promise<ConnectResult> {
    if (!this.api || !this.apiProxy || !this.apolloClient) {
      const { api, apiProxy, apolloClient } = await NauticalManager.createApi(
        this.config,
        this.apolloConfig,
        this.tokenExpirationCallback,
        this.onNauticalApiChange
      );

      this.api = api;
      this.apiProxy = apiProxy;
      this.apolloClient = apolloClient;
    }

    if (apiChangeListener) {
      this.apiChangeListener = apiChangeListener;
    }

    return { api: this.api, apolloClient: this.apolloClient };
  }

  private static createApi = async (
    config: ConfigInput,
    apolloConfig: ApolloConfigInput,
    tokenExpirationCallback: () => void,
    onNauticalApiChange: () => void
  ): Promise<CreateAPIResult> => {
    const { cache, persistCache, links, client } = apolloConfig;

    const nauticalCache =
      !client && cache
        ? cache
        : await createNauticalCache({
            persistCache: !!persistCache,
          });
    const nauticalLinks =
      !client && links
        ? links
        : createNauticalLinks({
            apiUrl: config.apiUrl,
            tokenExpirationCallback,
          });
    const apolloClient =
      client || createNauticalClient(nauticalCache, nauticalLinks);

    const apiProxy = new APIProxy(apolloClient);
    const api = new NauticalAPI(
      apolloClient,
      apiProxy,
      config,
      onNauticalApiChange
    );

    return { api, apiProxy, apolloClient };
  };

  private tokenExpirationCallback = async () => {
    if (!this.tokenRefreshing) {
      this.tokenRefreshing = true;

      const tokenRefreshResult = await this.api?.auth.refreshSignInToken();
      if (!tokenRefreshResult?.data?.token || tokenRefreshResult?.dataError) {
        await this.api?.auth.signOut();
      }

      this.tokenRefreshing = false;
    }
  };

  private onNauticalApiChange = () => {
    if (this.apiChangeListener) {
      this.apiChangeListener(this.api);
    }
  };
}

export * from "./auth";
export * from "./cache";
export * from "./links";
export * from "./client";
export * from "./gqlTypes/globalTypes";

// FIXME: It's imported here because it's not a monorepo yet
/* eslint-disable import/no-cycle */
export * from "./react";
/* eslint-enable */
